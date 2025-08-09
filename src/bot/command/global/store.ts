import Builder from "@/bot/globals/classes/command/global"
import { MessageFlags } from "discord.js"

export default new Builder()
	.build((builder) => builder
		.setName("store")
		.setDescription("General store, where you can purchase products.")
	)
	.listen(async (ctx) => {
		const locale = ctx.interaction.locale,
			userId = ctx.interaction.user.id,
			guild = ctx.interaction.guild
		await ctx.interaction.deferReply()
		if (!guild) {
			return await ctx.interaction.editReply("You are not in a guild, so you can't access the store.")
		}
		return await ctx.interaction.editReply({
			
			flags: MessageFlags.IsComponentsV2
		})
	})