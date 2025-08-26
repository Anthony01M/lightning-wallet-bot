import Builder from "@/discord/globals/classes/command/global"

import { MessageFlags } from "discord.js"

export default new Builder()
	.build((builder) => builder
		.setName("friend")
		.setDescription("Friend related commands.")
		.addSubcommand((subcommand) => subcommand
			.setName("list")
			.setDescription("view your friends list.")
		)
		.addSubcommand((subcommand) => subcommand
			.setName("remove")
			.setDescription("remove a user from your friends list.")
			.addIntegerOption((option) => option
				.setName("user")
				.setDescription("The user to remove from your friends list.")
				.setRequired(true)
				.setAutocomplete(true)
			)
		)
		.addSubcommandGroup((group) => group
			.setName("request")
			.setDescription("Friend request related commands.")
			.addSubcommand((subcommand) => subcommand
				.setName("sent")
				.setDescription("view your sent friend requests.")
			)
			.addSubcommand((subcommand) => subcommand
				.setName("received")
				.setDescription("view your received friend requests.")
			)
			.addSubcommand((subcommand) => subcommand
				.setName("cancel")
				.setDescription("cancel a sent friend request.")
				.addIntegerOption((option) => option
					.setName("request")
					.setDescription("The request you would like to cancel.")
					.setRequired(true)
					.setAutocomplete(true)
				)
			)
			.addSubcommand((subcommand) => subcommand
				.setName("accept")
				.setDescription("accept a received friend request.")
				.addIntegerOption((option) => option
					.setName("request")
					.setDescription("The request you would like to accept.")
					.setRequired(true)
					.setAutocomplete(true)
				)
			)
			.addSubcommand((subcommand) => subcommand
				.setName("decline")
				.setDescription("decline a received friend request.")
				.addIntegerOption((option) => option
					.setName("request")
					.setDescription("The request you would like to decline.")
					.setRequired(true)
					.setAutocomplete(true)
				)
			)
		)
		.addSubcommandGroup((group) => group
			.setName("block")
			.setDescription("Block related commands.")
			.addSubcommand((subcommand) => subcommand
				.setName("add")
				.setDescription("add a user to your block list.")
				.addUserOption((option) => option
					.setName("user")
					.setDescription("The user to block.")
					.setRequired(true))
			)
			.addSubcommand((subcommand) => subcommand
				.setName("remove")
				.setDescription("remove a user from your block list.")
				.addIntegerOption((option) => option
					.setName("user")
					.setDescription("The user to unblock.")
					.setRequired(true)
					.setAutocomplete(true)
				)
			)
			.addSubcommand((subcommand) => subcommand
				.setName("list")
				.setDescription("view your block list."))
		)
	)
	.listen(async (ctx) => {
		const locale = ctx.interaction.locale,
			userId = ctx.interaction.user.id,
			sub = ctx.interaction.options.getSubcommand(true)
		await ctx.interaction.deferReply({ flags: MessageFlags.Ephemeral })
		switch (ctx.interaction.options.getSubcommandGroup(false)) {
			case "request": {
				switch (sub) {
					case "sent": {
						return await ctx.interaction.editReply("This command is not implemented yet.")
					}
					case "received": {
						return await ctx.interaction.editReply("This command is not implemented yet.")
					}
					case "cancel": {
						return await ctx.interaction.editReply("This command is not implemented yet.")
					}
					case "accept": {
						return await ctx.interaction.editReply("This command is not implemented yet.")
					}
					case "decline": {
						return await ctx.interaction.editReply("This command is not implemented yet.")
					}
				}
			}
			case "block": {
				switch (sub) {
					case "add": {

					}
					case "remove": {

					}
					case "list": {
						return await ctx.interaction.editReply("This command is not implemented yet.")
					}
				}
			}
			default: {
				switch (sub) {
					case "list": {
						return await ctx.interaction.editReply("This command is not implemented yet.")
					}
					case "remove": {

					}
				}
			}
		}
	})
	.listenAutocomplete(async (ctx) => {
		const search = ctx.interaction.options.getFocused(true),
			userId = ctx.interaction.user.id

	})