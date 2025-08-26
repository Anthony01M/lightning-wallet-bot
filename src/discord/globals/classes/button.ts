import { ButtonInteraction, Client } from "discord.js"

import * as customid from "@/discord/globals/customid"
import Context from "@/discord/context"

export type Exported<Args extends any[] = []> = (interaction: { client: Client<true>, guildId: string | null, user: { id: string } }, ...args: Args) => string
export type PaginateType = 'next' | 'back' | 'refresh' | 'last' | 'first'

export default class Builder<Excluded extends (keyof Builder)[] = [], Arguments extends any[] = []> {
	protected listener: (ctx: Context<ButtonInteraction>) => any | Promise<any> = () => undefined
	protected m_name = ''

	public setName(name: string): Omit<Builder<[...Excluded, 'setName'], Arguments>, 'setName' | Excluded[number]> {
		this.m_name = name
		return this as any
	}

	public listen<Args extends any[]>(callback: (ctx: Context<ButtonInteraction>, ...args: Args) => any | Promise<any>): Omit<Builder<[...Excluded, 'listen'], Args>, 'listen' | Excluded[number]> {
		this.listener = callback as any
		return this as any
	}

	public export(): Exported<Arguments> {
		const fn: Exported<Arguments> & { m_name: string, listener: Function } = (interaction, ...args) => {
			const raw = `${this.m_name}°${args.map((a) => JSON.stringify(a, bigintReplacer).replace(/°|\^/g, (c) => encodeURIComponent(c))).join('°')}`,
				customId = customid.encode(interaction.client.user.id.concat((interaction.guildId ?? interaction.user.id) || 'g'), raw)
			if (customId.length > 100) {
				throw new Error('Custom ID exceeds the maximum length of 100 characters:' + customId)
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