import Builder from "@/discord/globals/classes/command/guild"

export default new Builder()
	.build((builder) => builder
		.setName("redpacket")
		.setDescription("Red-Packet related commands.")
		.addSubcommand((subcommand) => subcommand
			.setName("satoshi")
			.setDescription("Red-Packet a specific amount of Satoshi for a specific duration, and a description should you add.")
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of Satoshi to red-packet.")
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(15000)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName("usdt")
			.setDescription("Red-Packet a specific amount of USDT for a specific duration, and a description should you add.")
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of USDT to red-packet.")
				.setRequired(true)
				.setMinValue(0.001)
				.setMaxValue(15)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName("usdc")
			.setDescription("Red-Packet a specific amount of USDC for a specific duration, and a description should you add.")
			.addNumberOption((option) => option
				.setName("amount")
				.setDescription("The amount of USDC to red-packet.")
				.setRequired(true)
				.setMinValue(0.001)
				.setMaxValue(15)
			)
		)
	)
	.listen(async (ctx) => {
		const locale = ctx.interaction.locale,
			user = ctx.interaction.user.id
		await ctx.interaction.deferReply()
		switch (ctx.interaction.options.getSubcommand(true)) {
			case "satoshi": {
				const amount = ctx.interaction.options.getNumber("amount", true)
			}
			case "usdt": {
				const amount = ctx.interaction.options.getNumber("amount", true)
			}
			case "usdc": {
				const amount = ctx.interaction.options.getNumber("amount", true)
			}
		}
	})