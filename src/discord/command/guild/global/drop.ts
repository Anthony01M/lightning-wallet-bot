import Builder from "@/discord/globals/classes/command/guild"

import { MessageFlags } from "discord.js"

export default new Builder()
	.build((builder) => builder
		.setName("drop")
		.setDescription("Drop related commands.")
		.addSubcommand((subcommand) => subcommand
			.setName("satoshi")
			.setDescription("Drop a specific amount of Satoshi for a specific duration, and a description should you add.")
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of Satoshi to drop.")
				.setRequired(true)
				.setMinValue(10)
			)
			.addStringOption((option) => option
				.setName("description")
				.setDescription("The description of the drop.")
				.setRequired(false)
			)
			.addStringOption((option) => option
				.setName("duration")
				.setDescription("The duration of the drop (minimum: 1 minute, maximum: 24 hours).")
				.setRequired(false)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName("usdt")
			.setDescription("Drop a specific amount of USDT for a specific duration, and a description should you add.")
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of USDT to drop.")
				.setRequired(true)
				.setMinValue(0.01)
			)
			.addStringOption((option) => option
				.setName("description")
				.setDescription("The description of the drop.")
				.setRequired(false)
			)
			.addStringOption((option) => option
				.setName("duration")
				.setDescription("The duration of the drop (minimum: 1 minute, maximum: 24 hours).")
				.setRequired(false)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName("usdc")
			.setDescription("Drop a specific amount of USDC for a specific duration, and a description should you add.")
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of USDC to drop.")
				.setRequired(true)
				.setMinValue(0.01)
			)
			.addStringOption((option) => option
				.setName("description")
				.setDescription("The description of the drop.")
				.setRequired(false)
			)
			.addStringOption((option) => option
				.setName("duration")
				.setDescription("The duration of the drop (minimum: 1 minute, maximum: 24 hours).")
				.setRequired(false)
			)
		)
	)
	.listen(async (ctx) => {
		const locale = ctx.interaction.locale,
			user = ctx.interaction.user.id
		await ctx.interaction.deferReply({ flags: MessageFlags.Ephemeral })
		switch (ctx.interaction.options.getSubcommand(true)) {
			case "satoshi": {
				const amount = ctx.interaction.options.getNumber("amount", true),
					description = ctx.interaction.options.getString("description"),
					duration = ctx.interaction.options.getString("duration")
			}
			case "usdt": {
				const amount = ctx.interaction.options.getNumber("amount", true),
					description = ctx.interaction.options.getString("description"),
					duration = ctx.interaction.options.getString("duration")
			}
			case "usdc": {
				const amount = ctx.interaction.options.getNumber("amount", true),
					description = ctx.interaction.options.getString("description"),
					duration = ctx.interaction.options.getString("duration")
			}
		}
	})