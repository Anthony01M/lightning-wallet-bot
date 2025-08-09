import { AutocompleteInteraction, ChatInputCommandInteraction, Client, DiscordAPIError, GatewayIntentBits, Partials, version } from "discord.js"
import { filesystem } from "@rjweb/utils"
import * as Sentry from "@sentry/node"
import logger from "@/globals/logger"
import env from "@/globals/env"

import Context from "@/bot/context"

import * as customid from "@/bot/globals/customid"
import Event from "@/bot/globals/classes/event"
import Button from "@/bot/globals/classes/button"
import Modal from "@/bot/globals/classes/modal"

import BaseBuilder from "@/bot/globals/classes/command/base"
import ChannelMenu from "@/bot/globals/classes/menu/channel"
import RoleMenu from "@/bot/globals/classes/menu/role"
import MentionableMenu from "@/bot/globals/classes/menu/mentionable"
import StringMenu from "@/bot/globals/classes/menu/string"

const startTime = performance.now()
export const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
	],
	partials: []
})

const events: Event[] = [],
	commands: BaseBuilder[] = [],
	buttons: Button[] = [],
	modals: Modal[] = [],
	channelMenu: ChannelMenu[] = [],
	mentionableMenu: MentionableMenu[] = [],
	roleMenu: RoleMenu[] = [],
	stringMenu: StringMenu[] = []

function parseOptions(options: (AutocompleteInteraction | ChatInputCommandInteraction)['options']) {
	const output: Record<string, string> = {}
	if (!options.getSubcommand(false)) {
		Object.assign(output, ...options.data.map((option) => ({ [option.name]: option.value })))
	} else if (options.getSubcommandGroup(false)) {
		Object.assign(output, ...options.data[0].options?.[0].options?.map((option) => ({ [option.name]: option.value })) ?? [])
	} else {
		Object.assign(output, ...options.data[0].options?.map((option) => ({ [option.name]: option.value })) ?? [])
	}
	return output
}

client.on('interactionCreate', async (interaction) => {
	const startTime = performance.now(),
		scope = new Sentry.Scope()
	scope
		.setLevel('log')
		.setSpan(Sentry.startTransaction({
			name: 'interactionCreate'
		}))
		.setUser({
			id: interaction.user.id
		})
	const transaction = scope.getTransaction()!
	if (interaction.isChatInputCommand()) {
		const command = commands.find((command) => command['builder'].name === interaction.commandName)
		if (!command) return
		if (!interaction.guildId) {
			try {
				return await interaction[interaction.deferred ? 'editReply' : 'reply']({
					ephemeral: true,
					content: `\`⚠️\` Commands cannot be used in DMs.`
				})
			} catch { return }
		}
		const commandName = [interaction.commandName, interaction.options.getSubcommandGroup(false), interaction.options.getSubcommand(false)].filter(Boolean).join(' '),
			options = parseOptions(interaction.options)
		transaction.setName(`command {/${commandName}}`)
		const context = new Context(interaction, scope)
		context['startTime'] = startTime
		error: try {
			await Promise.resolve(command['listener'](context))
		} catch (error: any) {
			if (error instanceof DiscordAPIError) {
				if (error.code === 10062) break error
			}
			if (typeof error !== 'string') logger()
				.text('Discord Command Error')
				.text('\n')
				.text(error.stack ?? error.toString(), (c) => c.red)
				.error()
			if (typeof error !== 'string') Sentry.captureException(error, scope)
			try {
				await interaction[interaction.deferred ? 'editReply' : 'reply']({
					ephemeral: true,
					content: typeof error === 'string' ? error : '`⚠️` An error occurred while processing the command.'
				})
			} catch { }
		}
		transaction.finish()
		const log = logger()
			.text('DISCORD COMMAND', (c) => c.blue)
			.text(':')
			.text(`/${commandName}`, (c) => c.green)
			.text(`@${interaction.user.username}`, (c) => c.cyan)
		if (Object.keys(options).length > 0) {
			log.text(JSON.stringify(options), (c) => c.magenta)
		}
		log.text(`(${(performance.now() - startTime).toFixed(1)}ms)`, (c) => c.gray)
			.info()
	} else if (interaction.isAutocomplete()) {
		const command = commands.find((command) => command['builder'].name === interaction.commandName)
		if (!command) return
		const commandName = [interaction.commandName, interaction.options.getSubcommandGroup(false), interaction.options.getSubcommand(false)].filter(Boolean).join(' '),
			options = parseOptions(interaction.options)
		transaction.setName(`autocomplete {/${commandName}}`)
		transaction.setAttributes({
			options: JSON.stringify(options)
		})
		const context = new Context(interaction, scope)
		context['startTime'] = startTime
		error: try {
			await Promise.resolve((command['autocomplete'] as any)(context))
		} catch (error: any) {
			if (error instanceof DiscordAPIError) {
				if (error.code === 10062) break error
			}
			logger()
				.text('Discord Autocomplete Error')
				.text('\n')
				.text(error.stack ?? error.toString(), (c) => c.red)
				.error()
			Sentry.captureException(error, scope)
		} finally {
			transaction.finish()
		}
		logger()
			.text('DISCORD AUTOCOMPLETE', (c) => c.blue)
			.text(':')
			.text(`/${commandName}`, (c) => c.green)
			.text(`@${interaction.user.username}`, (c) => c.cyan)
			.text(JSON.stringify(options), (c) => c.magenta)
			.text(`(${(performance.now() - startTime).toFixed(1)}ms)`, (c) => c.gray)
			.info()
	} else if (interaction.isButton()) {
		let decoded = await customid.decode(interaction.client.user.id.concat(interaction.guildId ?? interaction.user.id), interaction.customId)
		if (!decoded) decoded = interaction.customId
		const [name, ...args] = decoded.split('°').filter(Boolean),
			button = buttons.find((button) => button['m_name'] === name)
		if (!button) return
		const options = args.map((arg) => JSON.parse(arg.replace(/%C2%B0|%5E/g, (c) => decodeURIComponent(c))))
		transaction.setName(`button {${button['m_name']}}`)
		transaction.setAttributes({
			options: JSON.stringify(options)
		})
		const context = new Context(interaction, scope)
		context['startTime'] = startTime
		error: try {
			await Promise.resolve((button['listener'] as any)(context, ...args.map((arg) => JSON.parse(arg))))
		} catch (error: any) {
			if (error instanceof DiscordAPIError) {
				if (error.code === 10062) break error
			}
			if (typeof error !== 'string') logger()
				.text('Discord Button Error')
				.text('\n')
				.text(error.stack ?? error.toString(), (c) => c.red)
				.error()
			if (typeof error !== 'string') Sentry.captureException(error, scope)
			try {
				await interaction.reply({
					ephemeral: true,
					content: typeof error === 'string' ? error : '`⚠️` An error occurred while processing the button.'
				})
			} catch { }
		} finally {
			transaction.finish()
		}
		const log = logger()
			.text('DISCORD BUTTON', (c) => c.blue)
			.text(':')
			.text(`${button['m_name']}`, (c) => c.green)
			.text(`@${interaction.user.username}`, (c) => c.cyan)
		if (options.length > 0) {
			log.text(JSON.stringify(options), (c) => c.magenta)
		}
		log.text(`(${(performance.now() - startTime).toFixed(1)}ms)`, (c) => c.gray)
			.info()
	} else if (interaction.isModalSubmit()) {
		const decoded = await customid.decode(interaction.client.user.id.concat(interaction.guildId ?? interaction.user.id), interaction.customId)
		if (!decoded) return
		const [modalRawArgs, listenerRawArgs] = decoded.split('^'),
			[name, ...modalArgs] = modalRawArgs.split('°').filter(Boolean),
			listenerArgs = listenerRawArgs.split('°').filter(Boolean),
			modal = modals.find((modal) => modal['m_name'] === name)
		if (!modal) return
		const modalOptions = modalArgs.map((arg) => JSON.parse(arg.replace(/%C2%B0|%5E/g, (c) => decodeURIComponent(c)))),
			listenerOptions = listenerArgs.map((arg) => JSON.parse(arg.replace(/%C2%B0|%5E/g, (c) => decodeURIComponent(c))))
		transaction.setName(`modal {${modal['m_name']}}`)
		transaction.setAttributes({
			modalOptions: JSON.stringify(modalOptions),
			listenerOptions: JSON.stringify(listenerOptions)
		})
		const context = new Context(interaction, scope)
		context['startTime'] = startTime
		error: try {
			await Promise.resolve((modal['listener'] as any)(context, ...listenerOptions))
		} catch (error: any) {
			if (error instanceof DiscordAPIError) {
				if (error.code === 10062) break error
			}
			if (typeof error !== 'string') logger()
				.text('Discord Modal Error')
				.text('\n')
				.text(error.stack ?? error.toString(), (c) => c.red)
				.error()
			if (typeof error !== 'string') Sentry.captureException(error, scope)
			try {
				await interaction.reply({
					ephemeral: true,
					content: typeof error === 'string' ? error : '`⚠️` An error occurred while processing the modal.'
				})
			} catch { }
		} finally {
			transaction.finish()
		}
		logger()
			.text('DISCORD MODAL', (c) => c.blue)
			.text(':')
			.text(`${modal['m_name']}`, (c) => c.cyan)
			.text(`(${(performance.now() - startTime).toFixed(1)}ms)`, (c) => c.gray)
			.info()
	} else if (interaction.isChannelSelectMenu()) {
		const decoded = await customid.decode(interaction.client.user.id.concat(interaction.guildId ?? interaction.user.id), interaction.customId)
		if (!decoded) return
		const [name, ...args] = decoded.split('°').filter(Boolean),
			menu = stringMenu.find((menu) => menu['m_name'] === name)
		if (!menu) return
		const options = args.map((arg) => JSON.parse(arg.replace(/%C2%B0|%5E/g, (c) => decodeURIComponent(c))))
		transaction.setName(`Channel Select Menu {${menu['m_name']}}`)
		const context = new Context(interaction, scope)
		context['startTime'] = startTime
		error: try {
			await Promise.resolve((menu['listener'] as any)(context, ...args.map((arg) => JSON.parse(arg))))
		} catch (error: any) {
			if (error instanceof DiscordAPIError) {
				if (error.code === 10062) break error
			}
			if (typeof error !== 'string') logger()
				.text('Discord Channel Select Menu Error')
				.text('\n')
				.text(error.stack ?? error.toString(), (c) => c.red)
				.error()
			if (typeof error !== 'string') Sentry.captureException(error, scope)
			try {
				await interaction.reply({
					ephemeral: true,
					content: typeof error === 'string' ? error : '`⚠️` An error occurred while processing the channel select menu.'
				})
			} catch { }
		} finally {
			transaction.finish()
		}
		const log = logger()
			.text('DISCORD CHANNEL SELECT MENU', (c) => c.blue)
			.text(':')
			.text(`${menu['m_name']}`, (c) => c.green)
			.text(`@${interaction.user.username}`, (c) => c.cyan)
		if (options.length > 0) {
			log.text(JSON.stringify(options), (c) => c.magenta)
		}
		log.text(`(${(performance.now() - startTime).toFixed(1)}ms)`, (c) => c.gray)
			.info()
	} else if (interaction.isRoleSelectMenu()) {
		const decoded = await customid.decode(interaction.client.user.id.concat(interaction.guildId ?? interaction.user.id), interaction.customId)
		if (!decoded) return
		const [name, ...args] = decoded.split('°').filter(Boolean),
			menu = stringMenu.find((menu) => menu['m_name'] === name)
		if (!menu) return
		const options = args.map((arg) => JSON.parse(arg.replace(/%C2%B0|%5E/g, (c) => decodeURIComponent(c))))
		transaction.setName(`Role Select Menu {${menu['m_name']}}`)
		const context = new Context(interaction, scope)
		context['startTime'] = startTime
		error: try {
			await Promise.resolve((menu['listener'] as any)(context, ...args.map((arg) => JSON.parse(arg))))
		} catch (error: any) {
			if (error instanceof DiscordAPIError) {
				if (error.code === 10062) break error
			}
			if (typeof error !== 'string') logger()
				.text('Discord Role Select Menu Error')
				.text('\n')
				.text(error.stack ?? error.toString(), (c) => c.red)
				.error()
			if (typeof error !== 'string') Sentry.captureException(error, scope)
			try {
				await interaction.reply({
					ephemeral: true,
					content: typeof error === 'string' ? error : '`⚠️` An error occurred while processing the role select menu.'
				})
			} catch { }
		} finally {
			transaction.finish()
		}
		const log = logger()
			.text('DISCORD ROLE SELECT MENU', (c) => c.blue)
			.text(':')
			.text(`${menu['m_name']}`, (c) => c.green)
			.text(`@${interaction.user.username}`, (c) => c.cyan)
		if (options.length > 0) {
			log.text(JSON.stringify(options), (c) => c.magenta)
		}
		log.text(`(${(performance.now() - startTime).toFixed(1)}ms)`, (c) => c.gray)
			.info()
	} else if (interaction.isMentionableSelectMenu()) {
		const decoded = await customid.decode(interaction.client.user.id.concat(interaction.guildId ?? interaction.user.id), interaction.customId)
		if (!decoded) return
		const [name, ...args] = decoded.split('°').filter(Boolean),
			menu = stringMenu.find((menu) => menu['m_name'] === name)
		if (!menu) return
		const options = args.map((arg) => JSON.parse(arg.replace(/%C2%B0|%5E/g, (c) => decodeURIComponent(c))))
		transaction.setName(`Mentionable Select Menu {${menu['m_name']}}`)
		const context = new Context(interaction, scope)
		context['startTime'] = startTime
		error: try {
			await Promise.resolve((menu['listener'] as any)(context, ...args.map((arg) => JSON.parse(arg))))
		} catch (error: any) {
			if (error instanceof DiscordAPIError) {
				if (error.code === 10062) break error
			}
			if (typeof error !== 'string') logger()
				.text('Discord Mentionable Select Menu Error')
				.text('\n')
				.text(error.stack ?? error.toString(), (c) => c.red)
				.error()
			if (typeof error !== 'string') Sentry.captureException(error, scope)
			try {
				await interaction.reply({
					ephemeral: true,
					content: typeof error === 'string' ? error : '`⚠️` An error occurred while processing the mentionable select menu.'
				})
			} catch { }
		} finally {
			transaction.finish()
		}
		const log = logger()
			.text('DISCORD MENTIONABLE SELECT MENU', (c) => c.blue)
			.text(':')
			.text(`${menu['m_name']}`, (c) => c.green)
			.text(`@${interaction.user.username}`, (c) => c.cyan)
		if (options.length > 0) {
			log.text(JSON.stringify(options), (c) => c.magenta)
		}
		log.text(`(${(performance.now() - startTime).toFixed(1)}ms)`, (c) => c.gray)
			.info()
	} else if (interaction.isStringSelectMenu()) {
		const decoded = await customid.decode(interaction.client.user.id.concat(interaction.guildId ?? interaction.user.id), interaction.customId)
		if (!decoded) return
		const [name, ...args] = decoded.split('°').filter(Boolean),
			menu = stringMenu.find((menu) => menu['m_name'] === name)
		if (!menu) return
		const options = args.map((arg) => JSON.parse(arg.replace(/%C2%B0|%5E/g, (c) => decodeURIComponent(c))))
		transaction.setName(`String Select Menu {${menu['m_name']}}`)
		const context = new Context(interaction, scope)
		context['startTime'] = startTime
		error: try {
			await Promise.resolve((menu['listener'] as any)(context, ...args.map((arg) => JSON.parse(arg))))
		} catch (error: any) {
			if (error instanceof DiscordAPIError) {
				if (error.code === 10062) break error
			}

			if (typeof error !== 'string') logger()
				.text('Discord String Select Menu Error')
				.text('\n')
				.text(error.stack ?? error.toString(), (c) => c.red)
				.error()

			if (typeof error !== 'string') Sentry.captureException(error, scope)

			try {
				await interaction.reply({
					ephemeral: true,
					content: typeof error === 'string' ? error : '`⚠️` An error occurred while processing the string menu.'
				})
			} catch { }
		} finally {
			transaction.finish()
		}
		const log = logger()
			.text('DISCORD STRING SELECT MENU', (c) => c.blue)
			.text(':')
			.text(`${menu['m_name']}`, (c) => c.green)
			.text(`@${interaction.user.username}`, (c) => c.cyan)
		if (options.length > 0) {
			log.text(JSON.stringify(options), (c) => c.magenta)
		}
		log.text(`(${(performance.now() - startTime).toFixed(1)}ms)`, (c) => c.gray)
			.info()
	}
})

async function main() {
	await Promise.all([
		Promise.all([...filesystem.getFiles(`${__dirname}/event`, { recursive: true }).filter((file) => file.endsWith('js')).map(async (file) => events.push((await import('file:///' + file)).default.default))]),
		Promise.all([...filesystem.getFiles(`${__dirname}/command/global`, { recursive: true }).filter((file) => file.endsWith('js')).map(async (file) => commands.push((await import('file:///' + file)).default.default))]),
		Promise.all([...filesystem.getFiles(`${__dirname}/command/guild/global`, { recursive: true }).filter((file) => file.endsWith('js')).map(async (file) => commands.push((await import('file:///' + file)).default.default))]),
		//Promise.all([...filesystem.getFiles(`${__dirname}/command/user`, { recursive: true }).filter((file) => file.endsWith('js')).map(async (file) => commands.push((await import('file:///' + file)).default.default))]),
		Promise.all([...filesystem.getFiles(`${__dirname}/button`, { recursive: true }).filter((file) => file.endsWith('js')).map(async (file) => buttons.push((await import('file:///' + file)).default.default))]),
		Promise.all([...filesystem.getFiles(`${__dirname}/modal`, { recursive: true }).filter((file) => file.endsWith('js')).map(async (file) => modals.push((await import('file:///' + file)).default.default))]),
		Promise.all([...filesystem.getFiles(`${__dirname}/menu/channel`, { recursive: true }).filter((file) => file.endsWith('js')).map(async (file) => channelMenu.push((await import('file:///' + file)).default.default))]),
		Promise.all([...filesystem.getFiles(`${__dirname}/menu/role`, { recursive: true }).filter((file) => file.endsWith('js')).map(async (file) => roleMenu.push((await import('file:///' + file)).default.default))]),
		Promise.all([...filesystem.getFiles(`${__dirname}/menu/mentionable`, { recursive: true }).filter((file) => file.endsWith('js')).map(async (file) => mentionableMenu.push((await import('file:///' + file)).default.default))]),
		Promise.all([...filesystem.getFiles(`${__dirname}/menu/string`, { recursive: true }).filter((file) => file.endsWith('js')).map(async (file) => stringMenu.push((await import('file:///' + file)).default.default))])
	])

	for (const event of events) {
		client.on(event['event'] as any, async (interaction, ...rest) => {
			const scope = new Sentry.Scope()
			scope
				.setLevel('log')
				.setSpan(Sentry.startTransaction({
					name: `event {${event['event']}}`
				}))
			const transaction = scope.getTransaction()!,
				context = new Context(interaction, scope)
			context['startTime'] = performance.now()
			try {
				await Promise.resolve(event['listener'](context, ...rest))
			} catch (error: any) {
				Sentry.captureException(error, scope)
				logger()
					.text('Discord Event Error')
					.text('\n')
					.text(error.stack ?? error.toString(), (c) => c.red)
					.error()
			} finally {
				transaction.finish()
			}
			logger()
				.text('DISCORD EVENT', (c) => c.blue)
				.text(':')
				.text(`${event['event']}`, (c) => c.cyan)
				.text(`(${(performance.now() - context['startTime']).toFixed(1)}ms)`, (c) => c.gray)
				.info()
		})
	}

	await client.login(env.BOT_TOKEN).then(async () => {
		await client.application?.commands.set(commands.map((command) => command['builder'].toJSON()))
		logger()
			.text('Discord', (c) => c.blueBright)
			.text(`(${version}) Connection established!`)
			.text(`(${(performance.now() - startTime).toFixed(1)}ms)`, (c) => c.gray)
			.text('\n')
			.text('Commands: ', (c) => c.yellowBright)
			.text(commands.length.toString(), (c) => c.green)
			.text('registered.', (c) => c.gray)
			.text('\n')
			.text('Events: ', (c) => c.yellowBright)
			.text(events.length.toString(), (c) => c.green)
			.text('registered.', (c) => c.gray)
			.text('\n')
			.text('Buttons: ', (c) => c.yellowBright)
			.text(buttons.length.toString(), (c) => c.green)
			.text('registered.', (c) => c.gray)
			.text('\n')
			.text('Modals: ', (c) => c.yellowBright)
			.text(modals.length.toString(), (c) => c.green)
			.text('registered.', (c) => c.gray)
			.text('\n')
			.text('Channel Menus: ', (c) => c.yellowBright)
			.text(channelMenu.length.toString(), (c) => c.green)
			.text('registered.', (c) => c.gray)
			.text('\n')
			.text('Role Menus: ', (c) => c.yellowBright)
			.text(roleMenu.length.toString(), (c) => c.green)
			.text('registered.', (c) => c.gray)
			.text('\n')
			.text('Mentionable Menus: ', (c) => c.yellowBright)
			.text(mentionableMenu.length.toString(), (c) => c.green)
			.text('registered.', (c) => c.gray)
			.text('\n')
			.text('String Menus: ', (c) => c.yellowBright)
			.text(stringMenu.length.toString(), (c) => c.green)
			.text('registered.', (c) => c.gray)
			.text('\n')
			.info()

	}).catch((err) => {
		logger()
			.text('Discord', (c) => c.redBright)
			.text('Connection failed')
			.text('\n')
			.text(err.stack!, (c) => c.red)
			.error()
	})
}

main()