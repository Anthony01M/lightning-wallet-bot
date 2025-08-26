import { pgTable, timestamp, integer, decimal, serial, text } from "drizzle-orm/pg-core"

import { currencyEnum } from "@/schema/enums"
import { user } from "@/schema/user"

export const userBoost = pgTable('user_boost', {
	id: serial('id').primaryKey(),

	userId: integer('user_id').references(() => user.id).notNull(),
	guildId: text('guild_id').notNull(),

	durationMonths: integer('duration_months').notNull(),
	currency: currencyEnum('currency').notNull(),
	amountPaid: decimal('amount_paid', { precision: 20, scale: 8 }).notNull(),

	startsAt: timestamp('starts_at').defaultNow().notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
})