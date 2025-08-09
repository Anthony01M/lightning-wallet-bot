import { MentionableSelectMenuInteraction, Client } from "discord.js"

import * as customid from "@/bot/globals/customid"
import Context from "@/bot/context"

export type Exported<Args extends any[] = []> = (interaction: { client: Client<true>, guildId: string | null, user: { id: string } }, ...args: Args) => string

export default class MentionableMenuBuilder<Excluded extends (keyof MentionableMenuBuilder)[] = [], Arguments extends any[] = []> {
	protected listener: (ctx: Context<MentionableSelectMenuInteraction>, ...args: Arguments) => any | Promise<any> = () => undefined
	protected m_name = ''

	public setName(name: string): Omit<MentionableMenuBuilder<[...Excluded, 'setName'], Arguments>, 'setName' | Excluded[number]> {
		this.m_name = name
		return this as any
	}

	public listen<Args extends any[]>(callback: (ctx: Context<MentionableSelectMenuInteraction>, ...args: Args) => any | Promise<any>): Omit<MentionableMenuBuilder<[...Excluded, 'listen'], Args>, 'listen' | Excluded[number]> {
		this.listener = callback as any

		return this as any
	}

	public export(): Exported<Arguments> {
		const fn: Exported<Arguments> & { m_name: string, listener: Function } = (interaction, ...args) => {
			const raw = `${this.m_name}°${args.map((a) => JSON.stringify(a, bigintReplacer).replace(/°|\^/g, (c) => encodeURIComponent(c))).join('°')}`,
				customId = customid.encode((interaction.client.user.id).concat((interaction.guildId ?? interaction.user.id) || 'g'), raw)
			if (customId.length > 100) {
				throw new Error('Custom ID exceeds the maximum length of 100 characters')
			}
			return customId
		}
		fn.m_name = this.m_name
		fn.listener = this.listener
		return fn
	}
}

function bigintReplacer(_key: string, value: any) {
	return typeof value === 'bigint' ? value.toString() : value;
}