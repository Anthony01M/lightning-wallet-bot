import { Events } from "discord.js"

import Context from "@/discord/context"

export default class Builder<Excluded extends (keyof Builder)[] = []> {
	protected listener: (ctx: Context<any>, ...rest: any[]) => any | Promise<any> = () => undefined
	protected event!: Events

	public listenTo(event: (events: typeof Events) => Events): Omit<Builder<[...Excluded, 'listenTo']>, 'listenTo' | Excluded[number]> {
		this.event = event(Events)
		return this as any
	}

	public listen<Interaction>(callback: (ctx: Context<Interaction>, ...rest: any[]) => any | Promise<any>): Omit<Builder<[...Excluded, 'listen']>, 'listen' | Excluded[number]> {
		this.listener = callback as any
		return this as any
	}
}