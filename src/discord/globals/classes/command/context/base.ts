import { ContextMenuCommandBuilder, ContextMenuCommandInteraction, MessageFlags, PermissionsBitField, ContextMenuCommandType } from "discord.js"

import Context from "@/discord/context"

export default class Builder<Excluded extends (keyof Builder)[] = []> {
	protected builder: ContextMenuCommandBuilder
	protected botPermissionCallback: ((ctx: Context<ContextMenuCommandInteraction>) => (keyof typeof PermissionsBitField.Flags | bigint | number)[] | Promise<(keyof typeof PermissionsBitField.Flags | bigint | number)[]>) | null = null
	protected listener: (ctx: Context<ContextMenuCommandInteraction>) => any | Promise<any> = () => undefined

	constructor(contexts: number[], integrationTypes: number[], type: ContextMenuCommandType) {
		this.builder = new ContextMenuCommandBuilder()
			.setContexts(contexts)
			.setIntegrationTypes(integrationTypes)
			.setType(type)
	}

	public build(callback: (builder: ContextMenuCommandBuilder) => any): Omit<Builder<[...Excluded, 'build']>, 'build' | Excluded[number]> {
		callback(this.builder)
		return this as any
	}

	public botPermission(callback: (ctx: Context<ContextMenuCommandInteraction>) => (keyof typeof PermissionsBitField.Flags | bigint | number)[] | Promise<(keyof typeof PermissionsBitField.Flags | bigint | number)[]>): Omit<Builder<[...Excluded, 'botPermission']>, 'botPermission' | Excluded[number]> {
		this.botPermissionCallback = callback
		return this as any
	}

	public listen(callback: (ctx: Context<ContextMenuCommandInteraction>) => any | Promise<any>): Omit<Builder<[...Excluded, 'listen']>, 'listen' | Excluded[number]> {
		this.listener = async (ctx: Context<ContextMenuCommandInteraction>) => {
			if (this.botPermissionCallback) {
				const required = await this.botPermissionCallback(ctx),
					appPermissions = ctx.interaction.appPermissions
				if (appPermissions) {
					const missing = required.filter(permission =>
						typeof permission === "string"
							? !appPermissions.has(PermissionsBitField.Flags[permission])
							: !appPermissions.has(BigInt(permission))
					)
					if (missing.length > 0) {
						return await ctx.interaction.reply({
							flags: MessageFlags.Ephemeral,
							content: `❌ I am missing the following permissions in this channel: ${missing.map(perm =>
								typeof perm === "string"
									? perm
									: Object.entries(PermissionsBitField.Flags).find(([k, v]) => v === perm)?.[0] ?? perm.toString()
							).join(", ")}`
						})
					}
				}
			}
			return callback(ctx)
		}
		return this as any
	}
}