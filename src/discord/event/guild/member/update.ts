import Event from "@/discord/globals/classes/event"

import { GuildMember, PartialGuildMember, TextChannel } from "discord.js"

export default new Event()
	.listenTo((events) => events.GuildMemberUpdate)
	.listen<[oldMember: GuildMember | PartialGuildMember, newMember: GuildMember]>(async (ctx, newMember: GuildMember) => {
	})