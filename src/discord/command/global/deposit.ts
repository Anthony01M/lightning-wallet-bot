import Builder from "@/discord/globals/classes/command/global"

import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder, MessageFlags } from "discord.js"

export default new Builder()
	.build((builder) => builder
		.setName("deposit")
		.setDescription("Deposit related commands.")
		.addSubcommand((subcommand) => subcommand
			.setName("satoshi")
			.setDescription("deposit a specific amount of Satoshi to your wallet.")
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of Satoshi you want to deposit.")
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(1000000)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName("usdt")
			.setDescription("deposit a specific amount of USDT to your wallet.")
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of USDT you want to deposit.")
				.setRequired(true)
				.setMinValue(0.0001)
				.setMaxValue(1000)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName("usdc")
			.setDescription("deposit a specific amount of USDC to your wallet.")
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of USDC you want to deposit.")
				.setRequired(true)
				.setMinValue(0.0001)
				.setMaxValue(1000)
			)
		)
	)
	.listen(async (ctx) => {
		const locale = ctx.interaction.locale,
			userId = ctx.interaction.user.id,
			amount = ctx.interaction.options.getNumber("amount", true)
		await ctx.interaction.deferReply({ flags: MessageFlags.Ephemeral })
		// ctx.interaction.options.getSubcommand(true)
		return await ctx.interaction.editReply({
			content: `I have sent you a deposit invoice in your Direct Messages`,
			components: [
				new ActionRowBuilder<MessageActionRowComponentBuilder>()
					.setComponents(
						new ButtonBuilder()
							.setStyle(ButtonStyle.Primary)
							.setLabel("Open Direct Message")
							.setURL(`https://discord.com/channels/@me/${ctx.client.application.id}`)
					)
			]
		})
	})