import { pgTable, timestamp, integer, decimal, boolean, serial, text } from "drizzle-orm/pg-core"

import { currencyEnum } from "@/schema/enums"
import { user } from "@/schema/user"

export const drop = pgTable("drop", {
	id: serial('id').primaryKey(),

	createdByUserId: integer('created_by_user_id').references(() => user.id).notNull(),

	currency: currencyEnum('currency').notNull(),
	totalAmount: decimal('total_amount', { precision: 20, scale: 8 }).notNull(),
	remainingAmount: decimal('remaining_amount', { precision: 20, scale: 8 }).notNull(),

	maxParticipants: integer('max_participants'),
	currentParticipants: integer('current_participants').default(0).notNull(),

	description: text('description'),

	isActive: boolean('is_active').default(true).notNull(),

	expiresAt: timestamp('expires_at'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	completedAt: timestamp('completed_at')
})