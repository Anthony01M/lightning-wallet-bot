import { relations } from "drizzle-orm"

import { guild } from "@/schema/guild"
import { guildSetting } from "@/schema/guild/setting"
import { guildBalance } from "@/schema/guild/balance"
import { guildDeposit } from "@/schema/guild/deposit"
import { guildWithdraw } from "@/schema/guild/withdraw"
import { guildLevel } from "@/schema/guild/level"
import { guildLevelClaim } from "@/schema/guild/level/claim"
import { guildSellableRole } from "@/schema/guild/store/role"
import { guildRolePurchase } from "@/schema/guild/store/role/purchase"
import { guildStorePurchase } from "@/schema/guild/store/purchase"
import { guildStoreSubscription } from "@/schema/guild/store/subscription"
import { guildStoreInvoice } from "@/schema/guild/store/invoice"

export const guildRelation = relations(guild, ({ one, many }) => ({
	setting: one(guildSetting, { fields: [guild.id], references: [guildSetting.guildId] }),
	level: one(guildLevel),
	balance: many(guildBalance),
	deposit: many(guildDeposit),
	withdrawal: many(guildWithdraw),
	levelClaim: many(guildLevelClaim),
	sellableRole: many(guildSellableRole),
	rolePurchase: many(guildRolePurchase),
	storePurchase: many(guildStorePurchase),
	storeSubscription: many(guildStoreSubscription),
	storeInvoice: many(guildStoreInvoice),
}))

export const guildSettingRelation = relations(guildSetting, ({ one }) => ({
	guild: one(guild, { fields: [guildSetting.guildId], references: [guild.id] }),
}))

export const guildBalanceRelation = relations(guildBalance, ({ one }) => ({
	guild: one(guild, { fields: [guildBalance.guildId], references: [guild.id] }),
}))

export const guildDepositRelation = relations(guildDeposit, ({ one }) => ({
	guild: one(guild, { fields: [guildDeposit.guildId], references: [guild.id] }),
}))

export const guildWithdrawRelation = relations(guildWithdraw, ({ one }) => ({
	guild: one(guild, { fields: [guildWithdraw.guildId], references: [guild.id] }),
}))

export const guildLevelRelation = relations(guildLevel, ({ one }) => ({
	guild: one(guild, { fields: [guildLevel.guildId], references: [guild.id] }),
}))

export const guildLevelClaimRelation = relations(guildLevelClaim, ({ one }) => ({
	guild: one(guild, { fields: [guildLevelClaim.guildId], references: [guild.id] }),
}))

export const guildSellableRoleRelation = relations(guildSellableRole, ({ one }) => ({
	guild: one(guild, { fields: [guildSellableRole.guildId], references: [guild.id] }),
}))

export const guildRolePurchaseRelation = relations(guildRolePurchase, ({ one }) => ({
	guild: one(guild, { fields: [guildRolePurchase.guildId], references: [guild.id] }),
}))

export const guildStorePurchaseRelation = relations(guildStorePurchase, ({ one }) => ({
	guild: one(guild, { fields: [guildStorePurchase.guildId], references: [guild.id] }),
}))

export const guildStoreSubscriptionRelation = relations(guildStoreSubscription, ({ one }) => ({
	guild: one(guild, { fields: [guildStoreSubscription.guildId], references: [guild.id] }),
}))

export const guildStoreInvoiceRelation = relations(guildStoreInvoice, ({ one }) => ({
	guild: one(guild, { fields: [guildStoreInvoice.guildId], references: [guild.id] }),
}))