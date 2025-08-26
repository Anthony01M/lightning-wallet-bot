import Builder from "@/discord/globals/classes/command/global"

import { MessageFlags } from "discord.js"

export default new Builder()
	.build((builder) => builder
		.setName("block")
		.setDescription("Block related commands.")
		.addSubcommand((subcommand) => subcommand
			.setName("add")
			.setDescription("add a user to your block list.")
			.addUserOption((option) => option
				.setName("user")
				.setDescription("The user to block.")
				.setRequired(true)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName("remove")
			.setDescription("remove a user from your block list.")
			.addIntegerOption((option) => option
				.setName("user")
				.setDescription("The user to unblock.")
				.setRequired(true)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName("list")
			.setDescription("view your block list.")
		)
	)
	.listen(async (ctx) => {
		const locale = ctx.interaction.locale,
			userId = ctx.interaction.user.id
		await ctx.interaction.deferReply({ flags: MessageFlags.Ephemeral })
		switch (ctx.interaction.options.getSubcommand(true)) {
			case "add": {

			}
			case "remove": {

			}
			case "list": {
				return await ctx.interaction.editReply("This command is not implemented yet.")
			}
		}
	})
	.listenAutocomplete(async (ctx) => {
		const search = ctx.interaction.options.getFocused(true),
			userId = ctx.interaction.user.id

	})