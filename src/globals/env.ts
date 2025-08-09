import { filesystem, string } from "@rjweb/utils"
import { z } from "zod"

let env: Record<string, string | undefined>
try {
	env = filesystem.env('./.env', { async: false })
} catch {
	try {
		env = filesystem.env('../.env', { async: false })
	} catch {
		env = process.env
	}
}

const infos = z.object({
	NODE_ENV: z.union([z.literal('development'), z.literal('production')]),
	SENTRY_URL: z.string().optional(),
	DATABASE_URL: z.string(),
	REDIS_URL: z.string(),
	BOT_TOKEN: z.string(),
	SPEED_WALLET: z.string(),
	ENCODING_SEQUENCE: z.string(),
	LOG_LEVEL: z.union([z.literal('none'), z.literal('info'), z.literal('debug')]),

	DEVELOPER_GUILD_ID: z.string(),

	ENCRYPTION: z.string().transform(v => string.kv(v, null, '&', ':')),
	PORT: z.string().optional(),
})

export type Environment = z.infer<typeof infos>

export default infos.parse(env)