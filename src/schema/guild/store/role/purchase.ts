import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core"

import { guildSellableRole } from "@/schema/guild/store/role"
import { user } from "@/schema/user"
import { guild } from "@/schema/guild"

export const guildRolePurchase = pgTable('guild_role_purchase', {
	id: serial('id').primaryKey(),

	guildId: integer('guild_id').references(() => guild.id).notNull(),
	userId: integer('user_id').references(() => user.id).notNull(),
	roleId: integer('role_id').references(() => guildSellableRole.id).notNull(),

	purchasedAt: timestamp('purchased_at').defaultNow().notNull(),
	expiresAt: timestamp('expires_at'), // null for permanent roles
	isActive: integer('is_active').default(1).notNull() // 1 for active, 0 for expired/cancelled
})