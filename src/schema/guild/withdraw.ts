import { pgTable, timestamp, decimal, text, serial, integer } from "drizzle-orm/pg-core"

import { currencyEnum } from "@/schema/enums"
import { guild } from "@/schema/guild"
import { user } from "@/schema/user"

export const guildWithdraw = pgTable('guild_withdraw', {
    id: serial('id').primaryKey(),
    guildId: integer('guild_id').references(() => guild.id, { onDelete: "cascade" }).notNull(),
    toUserId: integer('to_user_id').references(() => user.id).notNull(),
    currency: currencyEnum('currency').notNull(),
    amount: decimal('amount', { precision: 20, scale: 8 }).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
})