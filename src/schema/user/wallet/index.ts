import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core"

import { providerEnum } from "@/schema/enums"
import { user } from "@/schema/user"

export const userWallet = pgTable('user_wallet', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').references(() => user.id, { onDelete: "cascade" }).notNull(),

	provider: providerEnum('provider').notNull()
})