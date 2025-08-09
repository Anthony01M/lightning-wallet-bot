import Builder from "@/bot/globals/classes/command/global"

import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder } from "discord.js"
import { system } from "@rjweb/utils"
import os from "os"

export default new Builder()
	.build((builder) => builder
		.setName("bot")
		.setDescription("Bot related commands.")
		.addSubcommand((subcommand) => subcommand
			.setName("ping")
			.setDescription("view the bot's ping.")
		)
		.addSubcommand((subcommand) => subcommand
			.setName("statistics")
			.setDescription("view the bot's statistics.")
		)
		.addSubcommand((subcommand) => subcommand
			.setName("information")
			.setDescription("view the bot's information.")
		)
	)
	.listen(async (ctx) => {
		const locale = ctx.interaction.locale
		await ctx.interaction.deferReply()
		switch (ctx.interaction.options.getSubcommand(true)) {
			case "ping": {
				ctx.interaction.editReply({
					content: `\`🖥️\` Current ping to Discord is \`${formatLatency(ctx.interaction.client.ws.ping)}\`.`
				})
			}
			case "statistics": {
				ctx.interaction.editReply({

				})
			}
			case "information": {
				const [centralProcessingUnitUsage, df] = await Promise.all([
					system.cpu(),
					system.execute('df -B1 /', { async: true })
				]),
					centralProcessingUnit = os.cpus(),
					diskUsage = parseDfOutput(df)
				ctx.interaction.editReply({
					embeds: [
						ctx.Embed()
							.setTitle(`\`🤖\` Lightning Wallet Discord Bot Information`)
							.addFields([
								{
									name: "Overview",
									value: ctx.join(
										`> -# *Lightning Wallet Discord Bot __Overview__ information:*`,
										`__Guild${ctx.client.guilds.cache.size > 1 ? 's' : ''}__: ${ctx.client.guilds.cache.size}`,
										`__User${ctx.client.users.cache.size > 1 ? 's' : ''}__: ${ctx.client.users.cache.size}`,
										`__Uptime__: ${formatUptime(process.uptime())}`
									)
								},
								{
									name: "Stack",
									value: ctx.join(
										`> -# *Lightning Wallet Discord Bot __Stack__ information:*`,
										`__Node.js__: \`${process.version}\``,
										`__TypeScript__: \`${require('typescript/package.json').version}\``,
										`__pg__: \`${require('pg/package.json').version}\``
									)
								},
								{
									name: "License",
									value: ctx.join(
										"> -# *Lightning Wallet Discord Bot is built on top of the best packages available on the internet, __mainly__:*",
										"1. [discord.js](https://discord.js.org)",
										"2. [drizzle](https://orm.drizzle.team)",
										"3. [ioredis](https://www.npmjs.com/package/ioredis)",
										"4. [pg](https://www.npmjs.com/package/pg)",
										"5. [rjweb/utils](https://utils.rjweb.dev)",
										"6. [zod](https://zod.dev/)"
									)
								},
								{
									name: "Operating System (OS)",
									value: ctx.join(
										"> -# *Lightning Wallet Discord Bot __Operating System__ information:*",
										`__Platform__: ${os.platform()}`,
										`__Architecture__: ${os.arch()}`,
										`__Release__: ${os.release()}`,
										`__Uptime__: ${formatUptime(os.uptime())}`
									)
								},
								{
									name: "Central Processing Unit (CPU)",
									value: ctx.join(
										"> -# *Lightning Wallet Discord Bot __Central Processing Unit__ information:*",
										`__Model__: ${centralProcessingUnit[0].model}`,
										`__Speed__: ${centralProcessingUnit[0].speed} MHz`,
										`__Usage__: ${centralProcessingUnitUsage.toFixed(2)}%`,
										`__Cores__: ${centralProcessingUnit.length}`
									)
								},
								{
									name: "Memory (RAM)",
									value: ctx.join(
										"> -# *Lightning Wallet Discord Bot __Memory__ information:*",
										`__Total__: ${formatBytes(os.totalmem())}`,
										`__Free__: ${formatBytes(os.freemem())}`,
										`__Used__: ${formatBytes(os.totalmem() - os.freemem())}`
									)
								},
								{
									name: "Disk (STORAGE)",
									value: ctx.join(
										"> -# *Lightning Wallet Discord Bot __Disk__ information:*",
										`__Total__: ${formatBytes(diskUsage.total)}`,
										`__Used__: ${formatBytes(diskUsage.used)}`,
										`__Free__: ${formatBytes(diskUsage.free)}`
									)
								}
							])
					],
					components: [
						new ActionRowBuilder<MessageActionRowComponentBuilder>()
							.addComponents(
								new ButtonBuilder()
									.setStyle(ButtonStyle.Link)
									.setLabel("Add Me")
									.setURL(`discord://discord.com/api/oauth2/authorize?client_id=${ctx.client.application.id}&permissions=8&scope=bot%20applications.commands`)
							)
					]
				})
			}
		}
	})

function formatLatency(latency: number): string {
	const units = [
		{ value: 31536000000, name: 'year', plural: 'years' },
		{ value: 2592000000, name: 'month', plural: 'months' },
		{ value: 604800000, name: 'week', plural: 'weeks' },
		{ value: 86400000, name: 'day', plural: 'days' },
		{ value: 3600000, name: 'hour', plural: 'hours' },
		{ value: 60000, name: 'minute', plural: 'minutes' },
		{ value: 1000, name: 'second', plural: 'seconds' },
		{ value: 1, name: 'millisecond', plural: 'milliseconds' },
		{ value: 0.001, name: 'microsecond', plural: 'microseconds' },
		{ value: 0.000001, name: 'nanosecond', plural: 'nanoseconds' },
		{ value: 0.000000001, name: 'picosecond', plural: 'picoseconds' },
	]
	for (const unit of units) {
		if (latency >= unit.value) {
			const count = latency / unit.value
			latency %= unit.value
			if (count === 1) return `${count} ${unit.name}`
			else return `${count} ${unit.plural}`
		}
	}
	return '0 picoseconds'
}

function formatUptime(uptime: number): string {
	const units = [
		{ value: 31536000, name: 'year', plural: 'years' },
		{ value: 2592000, name: 'month', plural: 'months' },
		{ value: 604800, name: 'week', plural: 'weeks' },
		{ value: 86400, name: 'day', plural: 'days' },
		{ value: 3600, name: 'hour', plural: 'hours' },
		{ value: 60, name: 'minute', plural: 'minutes' },
		{ value: 1, name: 'second', plural: 'seconds' }
	]
	let remaining = uptime,
		result = ''
	for (const unit of units) {
		const value = Math.floor(remaining / unit.value)
		if (value > 0) {
			remaining -= value * unit.value
			result += `${value} ${value === 1 ? unit.name : unit.plural}, `
		}
	}
	return result.trim().replace(/,\s*$/, '')
}

function formatBytes(bytes: number, decimals = 2): string {
	if (bytes === 0) return '0 Bytes'
	const k = 1024,
		dm = decimals < 0 ? 0 : decimals,
		sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		i = Math.floor(Math.log(bytes) / Math.log(k))
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

function parseDfOutput(dfOutput: string): { free: number, total: number, used: number } {
	const lines = dfOutput.trim().split('\n')
	if (lines.length < 2) return { free: 0, total: 0, used: 0 }
	const values = lines[1].trim().split(/\s+/),
		used = parseFloat(values[2]) || 0,
		available = parseFloat(values[3]) || 0,
		total = used + available
	return { free: available, total, used }
}