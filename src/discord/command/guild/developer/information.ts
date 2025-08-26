import Builder from "@/discord/globals/classes/command/guild"

export default new Builder()
	.build((builder) => builder
		.setName("information")
		.setDescription("Information related commands.")
		.addSubcommand((subcommand) => subcommand
			.setName("user")
			.setDescription("Get information about a user.")
			.addStringOption((option) => option
				.setName("identification")
				.setDescription("The user's identification, either their Discord ID or their Database ID.")
				.setRequired(true)
				.setAutocomplete(true)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName("guild")
			.setDescription("suspend a guild from using the bot.")
			.addStringOption((option) => option
				.setName("identification")
				.setDescription("The guild's identification, either its Discord ID or its Database ID.")
				.setRequired(true)
				.setAutocomplete(true)
			)
		)
	)
	.listen(async (ctx) => {
		switch (ctx.interaction.options.getSubcommand(true)) {
			case "user": {
				const identification = ctx.interaction.options.getString("identification", true)
			}
			case "guild": {
				const identification = ctx.interaction.options.getString("identification", true)
			}
		}
	})
	.listenAutocomplete(async (ctx) => {
		switch (ctx.interaction.options.getSubcommand(true)) {
			case "user": {
				const identification = ctx.interaction.options.getString("identification", true)
			}
			case "guild": {
				const identification = ctx.interaction.options.getString("identification", true)
			}
		}
	})