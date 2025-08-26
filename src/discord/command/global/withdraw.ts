import Builder from "@/discord/globals/classes/command/global"

import { MessageFlags } from "discord.js"

export default new Builder()
	.build((builder) => builder
		.setName("withdraw")
		.setDescription("Withdraw related commands.")
		.addSubcommandGroup((group) => group
			.setName("satoshi")
			.setDescription("Satoshi related commands.")
			.addSubcommand((subcommand) => subcommand
				.setName("everything")
				.setDescription("Withdraw all your satoshi to your wallet.")
			)
			.addSubcommand((subcommand) => subcommand
				.setName("specific")
				.setDescription("Withdraw a specific amount of satoshi to your wallet.")
				.addIntegerOption((option) => option
					.setName("amount")
					.setDescription("The amount of satoshi you want to withdraw.")
					.setRequired(true)
				)
			)
		)
		.addSubcommandGroup((group) => group
			.setName("usdt")
			.setDescription("USDT related commands.")
			.addSubcommand((subcommand) => subcommand
				.setName("everything")
				.setDescription("Withdraw all your USDT to your wallet.")
			)
			.addSubcommand((subcommand) => subcommand
				.setName("specific")
				.setDescription("Withdraw a specific amount of USDT to your wallet.")
				.addIntegerOption((option) => option
					.setName("amount")
					.setDescription("The amount of USDT you want to withdraw.")
					.setRequired(true)
				)
			)
		)
		.addSubcommandGroup((group) => group
			.setName("usdc")
			.setDescription("USDC related commands.")
			.addSubcommand((subcommand) => subcommand
				.setName("everything")
				.setDescription("Withdraw all your USDC to your wallet.")
			)
			.addSubcommand((subcommand) => subcommand
				.setName("specific")
				.setDescription("Withdraw a specific amount of USDC to your wallet.")
				.addIntegerOption((option) => option
					.setName("amount")
					.setDescription("The amount of USDC you want to withdraw.")
					.setRequired(true)
				)
			)
		)
	)
	.listen(async (ctx) => {
		const locale = ctx.interaction.locale,
			userId = ctx.interaction.user.id
		await ctx.interaction.deferReply({ flags: MessageFlags.Ephemeral })
		switch (ctx.interaction.options.getSubcommandGroup(true)) {
			case "satoshi": {
				switch (ctx.interaction.options.getSubcommand(true)) {
					case "everything": {
						return await ctx.interaction.editReply("Withdrawing all your satoshi to your wallet.")
					}
					case "specific": {
						const amount = ctx.interaction.options.getInteger("amount", true)
						return await ctx.interaction.editReply(`Withdrawing ${amount} satoshi to your wallet.`)
					}
				}
			}
			case "usdt": {
				switch (ctx.interaction.options.getSubcommand(true)) {
					case "everything": {
						return await ctx.interaction.editReply("Withdrawing all your USDT to your wallet.")
					}
					case "specific": {
						const amount = ctx.interaction.options.getInteger("amount", true)
						return await ctx.interaction.editReply(`Withdrawing ${amount} USDT to your wallet.`)
					}
				}
			}
			case "usdc": {
				switch (ctx.interaction.options.getSubcommand(true)) {
					case "everything": {
						return await ctx.interaction.editReply("Withdrawing all your USDC to your wallet.")
					}
					case "specific": {
						const amount = ctx.interaction.options.getInteger("amount", true)
						return await ctx.interaction.editReply(`Withdrawing ${amount} USDC to your wallet.`)
					}
				}
			}
		}
	})