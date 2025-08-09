import Builder from "@/bot/globals/classes/command/global"

import { MessageFlags } from "discord.js"

export default new Builder()
	.build((builder) => builder
		.setName("profile")
		.setDescription("Profile related commands.")
		.addSubcommand((subcommand) => subcommand
			.setName("view")
			.setDescription("view your or another user's profile.")
			.addUserOption((option) => option
				.setName("user")
				.setDescription("The user whose profile you want to view.")
				.setRequired(false)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName("manage")
			.setDescription("manage your profile settings.")
		)
	)
	.listen(async (ctx) => {
		const locale = ctx.interaction.locale,
			userId = ctx.interaction.user.id
		await ctx.interaction.deferReply({ flags: MessageFlags.Ephemeral })
		switch (ctx.interaction.options.getSubcommand(true)) {
			case "view": {

			}
			case "manage": {

			}
		}
	})