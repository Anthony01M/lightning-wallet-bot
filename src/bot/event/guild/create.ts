import Event from "@/bot/globals/classes/event"

import { Guild } from "discord.js"

import logger from "@/globals/logger"

export default new Event()
	.listenTo((events) => events.GuildCreate)
	.listen<Guild>(async (ctx) => {
		logger()
			.text("Joined a new guild", (c) => c.green)
			.text(`Guild: ${ctx.interaction.name} (${ctx.interaction.id})`, (c) => c.blue)
			.text(`Owner: ${ctx.interaction.ownerId}`, (c) => c.yellow)
			.text(`Members: ${ctx.interaction.memberCount}`, (c) => c.cyan)
			.text(`Channels: ${ctx.interaction.channels.cache.size}`, (c) => c.magenta)
			.text(`Roles: ${ctx.interaction.roles.cache.size}`, (c) => c.red)
			.info()
	})