import Builder from "@/discord/globals/classes/command/user"

import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } from "discord.js"

export default new Builder()
	.build((builder) => builder
		.setName("transaction")
		.setDescription("View your transaction history.")
	)
	.listen(async (ctx) => {
		const locale = ctx.interaction.locale,
			user = ctx.interaction.user
		await ctx.interaction.deferReply({ flags: MessageFlags.Ephemeral })
		const componentOne = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setCustomId("transaction:disabled")
					.setLabel("Transactions")
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId("overview:disabled")
					.setLabel("Overview")
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true)
			)
		return await ctx.interaction.editReply({
			embeds: [
				ctx.Embed()
					.setTitle(`Your Transactions — Overview`)
					.addFields([
						{
							name: `Satoshi`,
							value: ctx.join(
								`Withdrawn: 0`,
								`Deposited: 0`
							)
						},
						{
							name: `USDT`,
							value: ctx.join(
								`Withdrawn: 0`,
								`Deposited: 0`
							)
						},
						{
							name: `USDC`,
							value: ctx.join(
								`Withdrawn: 0`,
								`Deposited: 0`
							)
						}
					])
			],
			components: [componentOne]
		})
	})