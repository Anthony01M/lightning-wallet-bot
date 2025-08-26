import Builder from "@/discord/globals/classes/command/guild"

import { MessageFlags } from "discord.js"

export default new Builder()
	.build((builder) => builder
		.setName("offer")
		.setDescription("OfferWall, a place to earn Satoshi, USDT, and USDC by completing tasks/surveys.")
	)
	.listen(async (ctx) => {
		await ctx.interaction.deferReply({ flags: MessageFlags.Ephemeral })
		return ctx.interaction.editReply({
			content: `This is a work in progress feature.`
		})
	})