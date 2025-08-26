import { ActionRowBuilder, ButtonInteraction, ChatInputCommandInteraction, ModalActionRowComponentBuilder, ModalBuilder, ModalSubmitInteraction } from "discord.js"

import * as customid from "@/discord/globals/customid"
import Context from "@/discord/context"

export type Exported<Args extends any[] = [], ListenerArgs extends any[] = []> = (interaction: ButtonInteraction | ChatInputCommandInteraction, args: Args, listenerArgs: ListenerArgs) => Promise<ModalBuilder>

class RowBuilder {
	protected rows: ((builder: ActionRowBuilder<ModalActionRowComponentBuilder>) => any)[] = []
	public addRow(callback: ((builder: ActionRowBuilder<ModalActionRowComponentBuilder>) => any) | null): this {
		if (callback) this.rows.push(callback)
		return this
	}
}

export default class Builder<Excluded extends (keyof Builder)[] = [], Arguments extends any[] = [], ListenerArguments extends any[] = []> {
	protected listener: (ctx: Context<ModalSubmitInteraction>) => any | Promise<any> = () => undefined
	protected builder!: (builder: RowBuilder, ...args: any) => any | Promise<any>
	protected title = ''
	protected m_name = ''
	public build<Args extends any[]>(callback: (builder: RowBuilder, ...args: Args) => any | Promise<any>): Omit<Builder<[...Excluded, 'build'], Args, ListenerArguments>, 'build' | Excluded[number]> {
		this.builder = callback
		return this as any
	}
	public setName(name: string): Omit<Builder<[...Excluded, 'setName'], Arguments, ListenerArguments>, 'setName' | Excluded[number]> {
		this.m_name = name
		return this as any
	}
	public setTitle(title: string): Omit<Builder<[...Excluded, 'setTitle'], Arguments, ListenerArguments>, 'setTitle' | Excluded[number]> {
		this.title = title
		return this as any
	}
	public listen<Args extends any[]>(callback: (ctx: Context<ModalSubmitInteraction>, ...args: Args) => any | Promise<any>): Omit<Builder<[...Excluded, 'listen'], Arguments, Args>, 'listen' | Excluded[number]> {
		this.listener = callback as any
		return this as any
	}
	public export(): Exported<Arguments, ListenerArguments> {
		const fn: Exported<Arguments, ListenerArguments> & { m_name: string, listener: any } = async (interaction, modalArgs, listenerArgs) => {
			const raw = `${this.m_name}°${modalArgs.map((a) => JSON.stringify(a, bigintReplacer).replace(/°|\^/g, (c) => encodeURIComponent(c))).join('°')}^${listenerArgs.map((a) => JSON.stringify(a, bigintReplacer).replace(/°|\^/g, (c) => encodeURIComponent(c))).join('°')}`,
				customId = customid.encode(interaction.client.user.id.concat((interaction.guildId ?? interaction.user.id) || 'g'), raw)
			if (customId.length > 100) {
				throw new Error('Custom ID exceeds the maximum length of 100 characters:' + customId)
			}
			const rowBuilder = new RowBuilder(),
				modalBuilder = new ModalBuilder()
					.setTitle(this.title)
					.setCustomId(customId),
				result = this.builder(rowBuilder, ...modalArgs)
			if (result instanceof Promise) {
				await result
			}
			for (const row of rowBuilder['rows']) {
				const actionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>()
				row(actionRow)
				modalBuilder.addComponents(actionRow)
			}
			return modalBuilder
		}
		fn.m_name = this.m_name
		fn.listener = this.listener
		return fn
	}
}

function bigintReplacer(_key: string, value: any) {
	return typeof value === 'bigint' ? value.toString() : value;
}