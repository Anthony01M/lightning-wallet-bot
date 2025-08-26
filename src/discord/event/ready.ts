import Event from "@/discord/globals/classes/event"

import { ActivityType, RESTPostAPIChatInputApplicationCommandsJSONBody, Client } from "discord.js"
import { filesystem, time } from "@rjweb/utils"

import env from "@/globals/env"

import BaseBuilder from "@/discord/globals/classes/command/base"

const commands: BaseBuilder[] = []

async function syncGuildCommands(
	client: Client<true>,
	guildId: string,
	desiredCommands: RESTPostAPIChatInputApplicationCommandsJSONBody[]
) {
	const existing = await client.application.commands.fetch({ guildId }),
		existingArray = Array.from(existing.values()),
		changed = desiredCommands.length !== existingArray.length ||
			desiredCommands.some(cmd => {
				const match = existingArray.find(e => e.name === cmd.name)
				return !match || JSON.stringify(match.toJSON()) !== JSON.stringify(cmd)
			})
	if (changed) await client.application.commands.set(desiredCommands, guildId)
}

export default new Event()
	.listenTo((events) => events.ClientReady)
	.listen(async (ctx) => {
		await Promise.all([
			Promise.all([...filesystem.getFiles(`${__dirname}/../command/guild/developer`, { recursive: true }).filter((file) => file.endsWith('js')).map(async (file) => commands.push((await import('file:///' + file)).default.default))]),
		])
		const desiredCommands = commands.map(cmd => cmd['builder'].toJSON())
		await syncGuildCommands(ctx.client, env.DEVELOPER_GUILD_ID, desiredCommands)
		while (true) {
			ctx.client.user.setActivity(`${formatLatency(ctx.client.ws.ping)} Bot Ping`, { type: ActivityType.Watching })
			await time.wait(time(10).s())
		}
	})

function formatLatency(latency: number): string {
	const units = [
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