import Event from "@/bot/globals/classes/event"

import { Role } from "discord.js"

import logger from "@/globals/logger"

export default new Event()
	.listenTo((events) => events.GuildRoleDelete)
	.listen<Role>(async (ctx) => {
		const guild = ctx.interaction.guild!
		logger()
			.text(`Role deleted: ${ctx.interaction.name} (${ctx.interaction.id})`, (c) => c.red)
			.text(`Guild: ${guild.name} (${guild.id})`, (c) => c.blue)
			.info()
	})