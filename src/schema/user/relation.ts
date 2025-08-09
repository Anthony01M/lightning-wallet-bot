
import { relations } from "drizzle-orm"

import { user } from "@/schema/user"
import { userSetting } from "@/schema/user/setting"
import { userBalance } from "@/schema/user/balance"
import { userBlock } from "@/schema/user/blocked"
import { userDeposit } from "@/schema/user/deposit"
import { userWithdraw } from "@/schema/user/withdraw"
import { userWallet } from "@/schema/user/wallet"
import { userLevel } from "@/schema/user/level"
import { userLevelClaim } from "@/schema/user/level/claim"
import { userFriend } from "@/schema/user/friend"
import { userFriendRequest } from "@/schema/user/friend/request"
import { userStorePurchase } from "@/schema/user/store/purchase"
import { userStoreSubscription } from "@/schema/user/store/subscription"
import { userStoreInvoice } from "@/schema/user/store/invoice"
import { drop } from "@/schema/user/events/drop/air"
import { dropParticipant } from "@/schema/user/events/drop/air/participant"
import { minedrop } from "@/schema/user/events/drop/mine"
import { minedropParticipants } from "@/schema/user/events/drop/mine/participant"
import { rain } from "@/schema/user/events/rain"
import { rainParticipant } from "@/schema/user/events/rain/participant"
import { redpacket } from "@/schema/user/events/redpacket"
import { tip } from "@/schema/user/events/tip"
import { codeGeneration } from "@/schema/user/events/code/generate"
import { codeRedemption } from "@/schema/user/events/code/redeem"

export const userRelation = relations(user, ({ one, many }) => ({
	setting: one(userSetting, { fields: [user.id], references: [userSetting.userId] }),
	level: one(userLevel),
	balances: many(userBalance),
	blocks: many(userBlock),
	deposits: many(userDeposit),
	withdrawals: many(userWithdraw),
	wallets: many(userWallet),
	levelClaim: many(userLevelClaim),
	friend: many(userFriend),
	friendRequestSent: many(userFriendRequest),
	friendRequestReceived: many(userFriendRequest),
	storePurchase: many(userStorePurchase),
	storeSubscription: many(userStoreSubscription),
	storeInvoice: many(userStoreInvoice),
	createdDrops: many(drop),
	dropParticipations: many(dropParticipant),
	createdMinedrops: many(minedrop),
	minedropParticipations: many(minedropParticipants),
	createdRains: many(rain),
	rainParticipations: many(rainParticipant),
	createdRedpackets: many(redpacket),
	claimedRedpackets: many(redpacket),
	tipsSent: many(tip),
	tipsReceived: many(tip),
	codeGenerations: many(codeGeneration),
	codeRedemptions: many(codeRedemption)
}))

export const userSettingRelation = relations(userSetting, ({ one }) => ({
	user: one(user, {
		fields: [userSetting.userId],
		references: [user.id],
	}),
}))

export const userBalanceRelation = relations(userBalance, ({ one }) => ({
	user: one(user, {
		fields: [userBalance.userId],
		references: [user.id],
	}),
}))

export const userBlockRelation = relations(userBlock, ({ one }) => ({
	blocker: one(user, {
		fields: [userBlock.blockerId],
		references: [user.id],
	}),
	blocked: one(user, {
		fields: [userBlock.blockedId],
		references: [user.id],
	}),
}))

export const userDepositRelation = relations(userDeposit, ({ one }) => ({
	user: one(user, {
		fields: [userDeposit.userId],
		references: [user.id],
	}),
}))

export const userWithdrawRelation = relations(userWithdraw, ({ one }) => ({
	user: one(user, {
		fields: [userWithdraw.userId],
		references: [user.id],
	}),
}))

export const userWalletRelation = relations(userWallet, ({ one }) => ({
	user: one(user, {
		fields: [userWallet.userId],
		references: [user.id],
	}),
}))

export const userLevelRelation = relations(userLevel, ({ one, many }) => ({
	user: one(user, {
		fields: [userLevel.userId],
		references: [user.id],
	}),
	claim: many(userLevelClaim),
}))

export const userLevelClaimRelation = relations(userLevelClaim, ({ one }) => ({
	user: one(user, {
		fields: [userLevelClaim.userId],
		references: [user.id],
	}),
}))

export const userFriendRelation = relations(userFriend, ({ one }) => ({
	user: one(user, {
		fields: [userFriend.userId],
		references: [user.id],
	}),
	friend: one(user, {
		fields: [userFriend.friendId],
		references: [user.id],
	}),
}))

export const userFriendRequestRelation = relations(userFriendRequest, ({ one }) => ({
	fromUser: one(user, {
		fields: [userFriendRequest.fromUserId],
		references: [user.id],
	}),
	toUser: one(user, {
		fields: [userFriendRequest.toUserId],
		references: [user.id],
	}),
}))

export const userStorePurchaseRelation = relations(userStorePurchase, ({ one }) => ({
	user: one(user, {
		fields: [userStorePurchase.userId],
		references: [user.id],
	}),
}))

export const userStoreSubscriptionRelation = relations(userStoreSubscription, ({ one }) => ({
	user: one(user, {
		fields: [userStoreSubscription.userId],
		references: [user.id],
	}),
}))

export const userStoreInvoiceRelation = relations(userStoreInvoice, ({ one }) => ({
	user: one(user, {
		fields: [userStoreInvoice.userId],
		references: [user.id],
	}),
	subscription: one(userStoreSubscription, {
		fields: [userStoreInvoice.subscriptionId],
		references: [userStoreSubscription.id],
	}),
}))

export const userDropRelation = relations(drop, ({ one }) => ({
	createdByUser: one(user, {
		fields: [drop.createdByUserId],
		references: [user.id],
	}),
}))

export const userDropParticipantRelation = relations(dropParticipant, ({ one }) => ({
	user: one(user, {
		fields: [dropParticipant.userId],
		references: [user.id],
	}),
}))

export const userMinedropRelation = relations(minedrop, ({ one }) => ({
	createdByUser: one(user, {
		fields: [minedrop.createdByUserId],
		references: [user.id],
	}),
}))

export const userMinedropParticipantsRelation = relations(minedropParticipants, ({ one }) => ({
	user: one(user, {
		fields: [minedropParticipants.userId],
		references: [user.id],
	}),
}))

export const userRainRelation = relations(rain, ({ one }) => ({
	createdByUser: one(user, {
		fields: [rain.createdByUserId],
		references: [user.id],
	}),
}))

export const userRainParticipantRelation = relations(rainParticipant, ({ one }) => ({
	user: one(user, {
		fields: [rainParticipant.userId],
		references: [user.id],
	}),
}))

export const userRedpacketRelation = relations(redpacket, ({ one }) => ({
	createdByUser: one(user, {
		fields: [redpacket.createdByUserId],
		references: [user.id],
	}),
	claimedByUser: one(user, {
		fields: [redpacket.claimedByUserId],
		references: [user.id],
	}),
}))

export const userTipRelation = relations(tip, ({ one }) => ({
	fromUser: one(user, {
		fields: [tip.fromUserId],
		references: [user.id],
	}),
	toUser: one(user, {
		fields: [tip.toUserId],
		references: [user.id],
	}),
}))

export const userCodeGenerationRelation = relations(codeGeneration, ({ one }) => ({
	creator: one(user, {
		fields: [codeGeneration.creatorId],
		references: [user.id],
	}),
}))

export const userCodeRedemptionRelation = relations(codeRedemption, ({ one }) => ({
	redeemer: one(user, {
		fields: [codeRedemption.redeemerId],
		references: [user.id],
	}),
}))