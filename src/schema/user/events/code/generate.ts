import { pgTable, serial, integer, text, decimal, timestamp } from "drizzle-orm/pg-core"

import { currencyEnum, codeStatusEnum } from "@/schema/enums"
import { user } from "@/schema/user"

export const codeGeneration = pgTable('code_generation', {
	id: serial('id').primaryKey(),

	creatorId: integer('creator_id').references(() => user.id).notNull(),

	code: text('code').notNull().unique(),
	currency: currencyEnum('currency').notNull(),
	amount: decimal('amount', { precision: 20, scale: 8 }).notNull(),
	status: codeStatusEnum('status').default('active').notNull(),
	maxRedemptions: integer('max_redemptions').default(1).notNull(),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	expiresAt: timestamp('expires_at')
})