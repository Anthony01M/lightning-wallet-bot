import Builder from "@/bot/globals/classes/command/guild"

export default new Builder()
	.build((builder) => builder
		.setName("tip")
		.setDescription("Tip related commands.")
		.addSubcommand((subcommand) => subcommand
			.setName("satoshi")
			.setDescription("Tip a specific amount of Satoshi to a user.")
			.addUserOption((option) => option
				.setName("user")
				.setDescription("The user to tip.")
				.setRequired(true)
			)
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of Satoshi to tip.")
				.setRequired(true)
				.setMinValue(1)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName("usdt")
			.setDescription("Tip a specific amount of USDT to a user.")
			.addUserOption((option) => option
				.setName("user")
				.setDescription("The user to tip.")
				.setRequired(true)
			)
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of USDT to tip.")
				.setRequired(true)
				.setMinValue(0.001)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName("usdc")
			.setDescription("Tip a specific amount of USDC to a user.")
			.addUserOption((option) => option
				.setName("user")
				.setDescription("The user to tip.")
				.setRequired(true)
			)
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of USDC to tip.")
				.setRequired(true)
				.setMinValue(0.001)
			)
		)
	)
	.listen(async (ctx) => {
		const locale = ctx.interaction.locale,
			user = ctx.interaction.user
		switch (ctx.interaction.options.getSubcommand(true)) {
			case "satoshi": {

			}
			case "usdt": {

			}
			case "usdc": {

			}
		}
	})