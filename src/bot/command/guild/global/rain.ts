import Builder from "@/bot/globals/classes/command/guild"

export default new Builder()
	.build((builder) => builder
		.setName("rain")
		.setDescription("Rain related commands.")
		.addSubcommand((subcommand) => subcommand
			.setName("satoshi")
			.setDescription("Rain a specific amount of Satoshi to a specific amount of users.")
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of Satoshi to rain.")
				.setRequired(true)
				.setMinValue(1)
			)
			.addNumberOption((option) => option
				.setName("users")
				.setDescription("The amount of users to rain to.")
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(250)
			)
			.addBooleanOption((option) => option
				.setName("equal")
				.setDescription("Whether to rain the same amount to each user.")
				.setRequired(true)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName("usdt")
			.setDescription("Rain a specific amount of USDT to a specific amount of users.")
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of USDT to rain.")
				.setRequired(true)
				.setMinValue(0.001)
			)
			.addNumberOption((option) => option
				.setName("users")
				.setDescription("The amount of users to rain to.")
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(250)
			)
			.addBooleanOption((option) => option
				.setName("equal")
				.setDescription("Whether to rain the same amount to each user.")
				.setRequired(true)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName("usdc")
			.setDescription("Rain a specific amount of USDC to a specific amount of users.")
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of USDC to rain.")
				.setRequired(true)
				.setMinValue(0.001)
			)
			.addNumberOption((option) => option
				.setName("users")
				.setDescription("The amount of users to rain to.")
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(250)
			)
			.addBooleanOption((option) => option
				.setName("equal")
				.setDescription("Whether to rain the same amount to each user.")
				.setRequired(true)
			)
		)
	)
	.listen(async (ctx) => {
		const locale = ctx.interaction.locale,
			user = ctx.interaction.user
		switch (ctx.interaction.options.getSubcommand(true)) {
			case "satoshi": {
				const amount = ctx.interaction.options.getNumber("amount", true),
					users = ctx.interaction.options.getNumber("users", true),
					equal = ctx.interaction.options.getBoolean("equal", true)
			}
			case "usdt": {
				const amount = ctx.interaction.options.getNumber("amount", true),
					users = ctx.interaction.options.getNumber("users", true),
					equal = ctx.interaction.options.getBoolean("equal", true)
			}
			case "usdc": {
				const amount = ctx.interaction.options.getNumber("amount", true),
					users = ctx.interaction.options.getNumber("users", true),
					equal = ctx.interaction.options.getBoolean("equal", true)
			}
		}
	})