import Builder from "@/discord/globals/classes/command/guild"

export default new Builder()
	.build((builder) => builder
		.setName("suspend")
		.setDescription("Suspend related commands.")
		.addSubcommandGroup((subcommandgroup) => subcommandgroup
			.setName("user")
			.setDescription("Suspend user related commands.")
			.addSubcommand((subcommand) => subcommand
				.setName("add")
				.setDescription("suspend a user from using the bot.")
				.addStringOption((option) => option
					.setName("identification")
					.setDescription("The user's identification, either their Discord ID or their Database ID.")
					.setRequired(true)
					.setAutocomplete(true)
				)
			)
			.addSubcommand((subcommand) => subcommand
				.setName("remove")
				.setDescription("remove a user's suspension from using the bot.")
				.addStringOption((option) => option
					.setName("identification")
					.setDescription("The user's identification, either their Discord ID or their Database ID.")
					.setRequired(true)
					.setAutocomplete(true)
				)
			)
			.addSubcommand((subcommand) => subcommand
				.setName("list")
				.setDescription("list all suspended users.")
			)
		)
		.addSubcommandGroup((subcommandgroup) => subcommandgroup
			.setName("guild")
			.setDescription("Suspend guild related commands.")
			.addSubcommand((subcommand) => subcommand
				.setName("add")
				.setDescription("suspend a guild from using the bot.")
				.addStringOption((option) => option
					.setName("identification")
					.setDescription("The guild's identification, either its Discord ID or its Database ID.")
					.setRequired(true)
					.setAutocomplete(true)
				)
			)
			.addSubcommand((subcommand) => subcommand
				.setName("remove")
				.setDescription("remove a guild's suspension from using the bot.")
				.addStringOption((option) => option
					.setName("identification")
					.setDescription("The guild's identification, either its Discord ID or its Database ID.")
					.setRequired(true)
					.setAutocomplete(true)
				)
			)
			.addSubcommand((subcommand) => subcommand
				.setName("list")
				.setDescription("list all suspended guilds.")
			)
		)
	)
	.listen(async (ctx) => {
		switch (ctx.interaction.options.getSubcommandGroup(true)) {
			case "user": {
				switch (ctx.interaction.options.getSubcommand(true)) {
					case "add": {
						const identification = ctx.interaction.options.getString("identification", true)
					}
					case "remove": {
						const identification = ctx.interaction.options.getString("identification", true)
					}
					case "list": {
					}
				}
			}
			case "guild": {
				switch (ctx.interaction.options.getSubcommand(true)) {
					case "add": {
						const identification = ctx.interaction.options.getString("identification", true)
					}
					case "remove": {
						const identification = ctx.interaction.options.getString("identification", true)
					}
					case "list": {
					}
				}
			}
		}
	})
	.listenAutocomplete(async (ctx) => {
		switch (ctx.interaction.options.getSubcommandGroup(true)) {
			case "user": {
				switch (ctx.interaction.options.getSubcommand(true)) {
					case "add": {
						const identification = ctx.interaction.options.getString("identification", true)
					}
					case "remove": {
						const identification = ctx.interaction.options.getString("identification", true)
					}
				}
			}
			case "guild": {
				switch (ctx.interaction.options.getSubcommand(true)) {
					case "add": {
						const identification = ctx.interaction.options.getString("identification", true)
					}
					case "remove": {
						const identification = ctx.interaction.options.getString("identification", true)
					}
				}
			}
		}
	})