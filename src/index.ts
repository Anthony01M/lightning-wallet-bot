import { filesystem } from "@rjweb/utils"
import * as Sentry from "@sentry/node"
import cron from "node-cron"
import * as fs from "fs"

import Crontab, { runContext } from "@/crontab"

import logger from "@/globals/logger"
import env from "@/globals/env"

Sentry.init({
	dsn: env.SENTRY_URL,
	environment: process.env.NODE_ENV === 'development' ? 'development' : 'production'
})

export default function getVersion() {
	return `${JSON.parse(fs.readFileSync('../package.json', 'utf8')).version}`
}

Promise.all([...filesystem.getFiles(`${__dirname}/crontabs`, { recursive: true }).filter((file) => file.endsWith('js')).map(async (file) => {
	const cronFile = (await import('file:///' + file)).default.default
	if (cronFile instanceof Crontab) {
		cron.schedule(cronFile['interval'], async () => {
			try {
				await Promise.resolve(cronFile['listener'](runContext))
			} catch (error: any) {
				logger()
					.text('Crontab Error')
					.text('\n')
					.text(error.stack ?? error.toString(), (c) => c.red)
					.error()
			}
		}, {
			timezone: 'UTC'
		})
	}
})]).then(() => {
	//if (env.PORT) require('@/api')
	require('@/bot')
})