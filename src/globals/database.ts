import { drizzle } from "drizzle-orm/node-postgres"
import { version } from "pg/package.json"
import { Client } from "pg"

import logger from "@/globals/logger"
import env from "@/globals/env"

import * as schema from "@/schema"

const startTime = performance.now(),
	client = new Client({
		connectionString: env.DATABASE_URL
	})

const connectWithRetry = async (retries = 5, delay = 5000) => {
	for (let i = 0; i < retries; i++) {
		try {
			await client.connect()
			logger()
				.text('Database', (c) => c.cyan)
				.text(`(${version}) Connection established!`)
				.text(`(${(performance.now() - startTime).toFixed(1)}ms)`, (c) => c.gray)
				.info()
			return
		} catch (error) {
			logger()
				.text(`Database connection failed. Retrying in ${delay / 1000} seconds...`, (c) => c.red)
				.error()
			await new Promise(res => setTimeout(res, delay))
		}
	}
	throw new Error('Failed to connect to the database after multiple attempts')
}

client.on('error', (error) => {
	logger()
		.text('Database connection error:', (c) => c.red)
		.text(error.message, (c) => c.red)
		.error()
	connectWithRetry()
})

connectWithRetry().catch(error => {
	logger()
		.text('Database connection error:', (c) => c.red)
		.text(error.message, (c) => c.red)
		.error()
	process.exit(1)
})

const db = drizzle(client, { schema })

export default Object.assign(db, {
	schema,
})