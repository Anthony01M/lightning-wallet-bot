import { pgTable, timestamp, integer, decimal, serial, varchar } from "drizzle-orm/pg-core"

import { currencyEnum } from "@/schema/enums"
import { user } from "@/schema/user"

export const tip = pgTable('tip', {
	id: serial('id').primaryKey(),

	fromUserId: integer('from_user_id').references(() => user.id).notNull(),
	toUserId: integer('to_user_id').references(() => user.id).notNull(),
	toDiscordId: varchar('to_discord_id', { length: 32 }),

	currency: currencyEnum('currency').notNull(),
	amount: decimal('amount', { precision: 20, scale: 8 }).notNull(),

	createdAt: timestamp('created_at').defaultNow().notNull()
})