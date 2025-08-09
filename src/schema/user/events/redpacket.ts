import { pgTable, timestamp, integer, decimal, serial, varchar } from "drizzle-orm/pg-core"

import { currencyEnum } from "@/schema/enums"
import { user } from "@/schema/user"

export const redpacket = pgTable('redpacket', {
	id: serial('id').primaryKey(),

	createdByUserId: integer('created_by_user_id').references(() => user.id).notNull(),
	claimedByUserId: integer('claimed_by_user_id').references(() => user.id),
    claimedDiscordId: varchar('claimed_discord_id', { length: 32 }),

	currency: currencyEnum('currency').notNull(),
	amount: decimal('amount', { precision: 20, scale: 8 }).notNull(),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	claimedAt: timestamp('claimed_at')
})