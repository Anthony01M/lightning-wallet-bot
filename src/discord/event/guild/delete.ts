import Event from "@/discord/globals/classes/event"

import { Guild } from "discord.js"

import logger from "@/globals/logger"

export default new Event()
	.listenTo((events) => events.GuildDelete)
	.listen<Guild>(async (ctx) => {
		const guild = ctx.interaction
		logger()
			.text(`Left a guild: ${guild.name} (${guild.id})`, (c) => c.red)
			.info()
	})