import Builder from "@/bot/globals/classes/command/guild"

export default new Builder()
	.build((builder) => builder
		.setName("minedrop")
		.setDescription("Mine-Drop related commands.")
		.addSubcommand((subcommand) => subcommand
			.setName("satoshi")
			.setDescription("Mine-Drop a specific amount of Satoshi to a duration if specified.")
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of Satoshi to mine-drop.")
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(5000)
			)
			.addStringOption((option) => option
				.setName("grid")
				.setDescription("The grid layout for the mine-drop.")
				.setChoices(
					{ name: "3x3", value: "3x3" },
					{ name: "3x4", value: "3x4" },
					{ name: "3x5", value: "3x5" },
					{ name: "4x3", value: "4x3" },
					{ name: "4x4", value: "4x4" },
					{ name: "4x5", value: "4x5" },
					{ name: "5x3", value: "5x3" },
					{ name: "5x4", value: "5x4" },
					{ name: "5x5", value: "5x5" }
				)
				.setRequired(false)
			)
			.addStringOption((option) => option
				.setName("duration")
				.setDescription("The duration for the mine-drop (min: 15 seconds, max: 24 hours), if not specified, permanent.")
				.setRequired(false)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName("usdt")
			.setDescription("Mine-Drop a specific amount of USDT to a duration if specified.")
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of USDT to mine-drop.")
				.setRequired(true)
				.setMinValue(0.001)
				.setMaxValue(5)
			)
			.addStringOption((option) => option
				.setName("grid")
				.setDescription("The grid layout for the mine-drop.")
				.setChoices(
					{ name: "3x3", value: "3x3" },
					{ name: "3x4", value: "3x4" },
					{ name: "3x5", value: "3x5" },
					{ name: "4x3", value: "4x3" },
					{ name: "4x4", value: "4x4" },
					{ name: "4x5", value: "4x5" },
					{ name: "5x3", value: "5x3" },
					{ name: "5x4", value: "5x4" },
					{ name: "5x5", value: "5x5" }
				)
				.setRequired(false)
			)
			.addStringOption((option) => option
				.setName("duration")
				.setDescription("The duration for the mine-drop (min: 15 seconds, max: 24 hours), if not specified, permanent.")
				.setRequired(false)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName("usdc")
			.setDescription("Mine-Drop a specific amount of USDC to a duration if specified.")
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of USDC to mine-drop.")
				.setRequired(true)
				.setMinValue(0.001)
				.setMaxValue(5)
			)
			.addStringOption((option) => option
				.setName("grid")
				.setDescription("The grid layout for the mine-drop.")
				.setChoices(
					{ name: "3x3", value: "3x3" },
					{ name: "3x4", value: "3x4" },
					{ name: "3x5", value: "3x5" },
					{ name: "4x3", value: "4x3" },
					{ name: "4x4", value: "4x4" },
					{ name: "4x5", value: "4x5" },
					{ name: "5x3", value: "5x3" },
					{ name: "5x4", value: "5x4" },
					{ name: "5x5", value: "5x5" }
				)
				.setRequired(false)
			)
			.addStringOption((option) => option
				.setName("duration")
				.setDescription("The duration for the mine-drop (min: 15 seconds, max: 24 hours), if not specified, permanent.")
				.setRequired(false)
			)
		)
	)
	.listen(async (ctx) => {
		const locale = ctx.interaction.locale,
			user = ctx.interaction.user
		switch (ctx.interaction.options.getSubcommand(true)) {
			case "satoshi": {
				const amount = ctx.interaction.options.getNumber("amount", true),
					grid = ctx.interaction.options.getString("grid", false),
					duration = ctx.interaction.options.getString("duration", false)
			}
			case "usdt": {
				const amount = ctx.interaction.options.getNumber("amount", true),
					grid = ctx.interaction.options.getString("grid", false),
					duration = ctx.interaction.options.getString("duration", false)
			}
			case "usdc": {
				const amount = ctx.interaction.options.getNumber("amount", true),
					grid = ctx.interaction.options.getString("grid", false),
					duration = ctx.interaction.options.getString("duration", false)
			}
		}
	})