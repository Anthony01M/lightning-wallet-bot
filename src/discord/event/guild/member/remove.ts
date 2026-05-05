import Event from "@/discord/globals/classes/event"

import { Message } from "discord.js"

export default new Event()
	.listenTo((events) => events.GuildMemberRemove)
	.listen<Message>(async (ctx) => {
	})