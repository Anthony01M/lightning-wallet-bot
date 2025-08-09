import getVersion from "@/index"

import db from "@/globals/database"
import cache from "@/globals/cache"
import env from "@/globals/env"

export const runContext = {
	env,
	database: db,
	cache,
	appVersion: getVersion(),
	join(...strings: (string | number | undefined | null | boolean)[]): string {
		return strings.filter((str) => str === '' || Boolean(str)).join('\n')
	}
} as const

export default class Builder<Excluded extends (keyof Builder)[] = []> {
	protected interval: string = '* * * * * *'
	protected listener: (ctx: typeof runContext) => any | Promise<any> = () => undefined
	public cron(interval: string): Omit<Builder<[...Excluded, 'cron']>, 'cron' | Excluded[number]> {
		this.interval = interval
		return this as any
	}
	public listen(callback: (ctx: typeof runContext) => any | Promise<any>): Omit<Builder<[...Excluded, 'listen']>, 'listen' | Excluded[number]> {
		this.listener = callback as any
		return this as any
	}
}