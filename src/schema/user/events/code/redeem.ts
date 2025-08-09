import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core"

import { codeGeneration } from "@/schema/user/events/code/generate"
import { user } from "@/schema/user"

export const codeRedemption = pgTable('code_redemption', {
	id: serial('id').primaryKey(),
	codeId: integer('code_id').references(() => codeGeneration.id).notNull(),
	redeemerId: integer('redeemer_id').references(() => user.id).notNull(),
	redeemedAt: timestamp('redeemed_at').defaultNow().notNull()
})