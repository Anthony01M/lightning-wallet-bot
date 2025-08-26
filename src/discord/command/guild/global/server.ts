import Builder from "@/discord/globals/classes/command/guild"

import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, ContainerBuilder, MessageFlags, SectionBuilder, SeparatorBuilder, TextDisplayBuilder } from "discord.js"

export default new Builder()
	.build((builder) => builder
		.setName("server")
		.setDescription("Server Information.")
	)
	.listen(async (ctx) => {
		const locale = ctx.interaction.locale,
			guild = ctx.interaction.guild!,
			userId = ctx.interaction.user.id
		await ctx.interaction.deferReply()
		const embed = ctx.Embed()
			.setTitle(`${guild.name}'s Information`)
			.addFields([
				{
					name: "💰 Balance",
					value: ctx.join(
						`• **Satoshi:** 0`,
						`• **USDT:** 0`,
						`• **USDC:** 0`
					),
					inline: false
				},
				{
					name: "📋 Details",
					value: ctx.join(
						`• **Owner:** <@${guild.ownerId}>`,
						`• **Created:** <t:${Math.floor(guild.createdAt.getTime() / 1000)}:F>`,
						`• **Members:** ${guild.memberCount}`
					),
					inline: false
				},
				{
					name: "🏆 Progress",
					value: ctx.join(
						`• **Level:** 0`,
						`• **Boost Level:** 0`,
						`• **Rank:** #0`
					),
					inline: false
				}
			])
		if (guild.description) embed.setDescription(guild.description)
		const publicRow = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('donate')
					.setLabel('Donate')
					.setStyle(ButtonStyle.Primary),
			)
		/*
		if guild's level is higher than 2:
		new ButtonBuilder()
					.setCustomId('boost')
					.setLabel('Boost')
					.setStyle(ButtonStyle.Success)
		*/
		await ctx.interaction.editReply({
			embeds: [embed],
			components: [publicRow]
		})
		const member = guild.members.cache.get(userId),
			isAdmin = member?.permissions.has("Administrator"),
			isOwner = userId === guild.ownerId

		if (isAdmin || isOwner) {
			const adminContainer = new ContainerBuilder()
				.addTextDisplayComponents(
					new TextDisplayBuilder({
						content: `\`🖥️\` Server Administration Panel`,
						type: ComponentType.TextDisplay
					})
				)
				.addSeparatorComponents(
					new SeparatorBuilder()
				)
				.addSectionComponents(section => section
					.addTextDisplayComponents(
						new TextDisplayBuilder({
							content: `\`⚙️\` Server Configuration`,
							type: ComponentType.TextDisplay
						})
					)
					.setButtonAccessory(button => button
						.setCustomId('server-config')
						.setLabel('Configurate')
					)
				)
				.addSectionComponents(section => section
					.addTextDisplayComponents(
						new TextDisplayBuilder({
							content: ctx.join(
								`> -# Modify the server's configuration.`,
								`**Contains:**`,
								`1. Booster Role (LOCKED, to unlock, please reach server level 2.)`,
								`2. Audit logs Channel`,
								`3. Server Store`
							),
							type: ComponentType.TextDisplay
						})
					)
				)
				.addSeparatorComponents(
					new SeparatorBuilder()
				)
				.addSectionComponents(section => section
					.addTextDisplayComponents(
						new TextDisplayBuilder({
							content: `\`🎁\` Level Rewards`,
							type: ComponentType.TextDisplay
						})
					)
					.setButtonAccessory(button => button
						.setCustomId('level-rewards')
						.setLabel('Rewards')
					)
				)
				.addSectionComponents(section => section
					.addTextDisplayComponents(
						new TextDisplayBuilder({
							content: ctx.join(
								`> -# View the server's level rewards.`,
								`**Contains:**`,
								`1. Experience Progress`,
								`2. Rewards`
							),
							type: ComponentType.TextDisplay
						})
					)
				)
				.addSeparatorComponents(
					new SeparatorBuilder()
				)
				.addSectionComponents(section => section
					.addTextDisplayComponents(
						new TextDisplayBuilder({
							content: `\`📜\` Transcripts`,
							type: ComponentType.TextDisplay
						})
					)
					.setButtonAccessory(button => button
						.setCustomId('transcripts')
						.setLabel('Transcripts')
					)
				)
				.addSectionComponents(section => section
					.addTextDisplayComponents(
						new TextDisplayBuilder({
							content: ctx.join(
								`> -# View the server's transcripts.`,
								`**Contains:**`,
								`1. User's Transcripts (*tips, drops, etcetera.*)`,
								`2. Store Transcripts (*sales, etcetera.*)`
							),
							type: ComponentType.TextDisplay
						})
					)
				)
			if (isOwner) {
				adminContainer
					.addSeparatorComponents(
						new SeparatorBuilder()
					)
					.addSectionComponents(section => section
						.addTextDisplayComponents(
							new TextDisplayBuilder({
								content: `\`💸\` Withdraw`,
								type: ComponentType.TextDisplay
							})
						)
						.setButtonAccessory(button => button
							.setCustomId('withdraw')
							.setLabel('Withdraw')
							.setStyle(ButtonStyle.Danger)
						)
					)
					.addSectionComponents(section => section
						.addTextDisplayComponents(
							new TextDisplayBuilder({
								content: ctx.join(
									`> -# Withdraw the server's balance to your account.`,
									`**Contains:**`,
									`1. Satoshi`,
									`2. USDT`,
									`3. USDC`
								),
								type: ComponentType.TextDisplay
							})
						)
					)
			}
			await ctx.interaction.followUp({
				components: [adminContainer],
				flags: [MessageFlags.Ephemeral, MessageFlags.IsComponentsV2]
			})
		}
	})