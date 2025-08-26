import { pgTable, serial, integer, decimal, boolean, timestamp } from "drizzle-orm/pg-core"

import { minedrop } from "@/schema/user/events/drop/mine"
import { user } from "@/schema/user"

export const minedropParticipants = pgTable('minedrop_participants', {
	id: serial('id').primaryKey(),

	minedropId: integer('minedrop_id').references(() => minedrop.id).notNull(),
	userId: integer('user_id').references(() => user.id).notNull(),

	gridPosition: integer('grid_position').notNull(),
	isBomb: boolean('is_bomb').notNull(),
	amountReceived: decimal('amount_received', { precision: 20, scale: 8 }).default('0').notNull(),
	
	participatedAt: timestamp('participated_at').defaultNow().notNull()
})