import { AutocompleteInteraction, ChatInputCommandInteraction, MessageFlags, PermissionsBitField, SlashCommandBuilder } from "discord.js"

import Context from "@/discord/context"

export default class BaseBuilder<Excluded extends (keyof BaseBuilder)[] = []> {
	protected builder: SlashCommandBuilder
	protected botPermissionCallback: ((ctx: Context<ChatInputCommandInteraction>) => (keyof typeof PermissionsBitField.Flags | bigint | number)[] | Promise<(keyof typeof PermissionsBitField.Flags | bigint | number)[]>) | null = null
	protected listener: (ctx: Context<ChatInputCommandInteraction>) => any | Promise<any> = () => undefined
	protected autocomplete: (ctx: Context<AutocompleteInteraction>) => any | Promise<any> = () => undefined

	constructor(contexts: number[], integrationTypes: number[]) {
		this.builder = new SlashCommandBuilder()
			.setContexts(contexts)
			.setIntegrationTypes(integrationTypes)
	}

	public build(callback: (builder: SlashCommandBuilder) => any): Omit<BaseBuilder<[...Excluded, 'build']>, 'build' | Excluded[number]> {
		callback(this.builder)
		return this as any
	}

	public botPermission(callback: (ctx: Context<ChatInputCommandInteraction>) => (keyof typeof PermissionsBitField.Flags | bigint | number)[] | Promise<(keyof typeof PermissionsBitField.Flags | bigint | number)[]>): Omit<BaseBuilder<[...Excluded, 'botPermission']>, 'botPermission' | Excluded[number]> {
		this.botPermissionCallback = callback
		return this as any
	}

	public listen(callback: (ctx: Context<ChatInputCommandInteraction>) => any | Promise<any>): Omit<BaseBuilder<[...Excluded, 'listen']>, 'listen' | Excluded[number]> {
		this.listener = async (ctx: Context<ChatInputCommandInteraction>) => {
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

	public listenAutocomplete(callback: (ctx: Context<AutocompleteInteraction>) => any | Promise<any>): Omit<BaseBuilder<[...Excluded, 'listenAutocomplete']>, 'listenAutocomplete' | Excluded[number]> {
		this.autocomplete = callback as any
		return this as any
	}
}