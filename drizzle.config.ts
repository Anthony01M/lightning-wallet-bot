import { defineConfig } from "drizzle-kit"
import { filesystem } from "@rjweb/utils"

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/schema/index.ts',
	dbCredentials: {
		url: filesystem.env('.env', { async: false }).DATABASE_URL
	}
})