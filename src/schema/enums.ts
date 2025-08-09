import { pgEnum } from "drizzle-orm/pg-core"

export const providerEnum = pgEnum('provider', [
	'speed_wallet'
])

export const currencyEnum = pgEnum('currency', ['satoshi', 'usdt', 'usdc'])

export const transactionStatusEnum = pgEnum('transaction_status', [
	'pending',
	'completed',
	'failed',
	'cancelled'
])

export const codeStatusEnum = pgEnum('code_status', [
	'active',
	'claimed',
	'expired'
])

export const friendRequestStatusEnum = pgEnum('friend_request_status', [
	'pending',
	'accepted',
	'declined'
])

export const storeProductCategoryEnum = pgEnum('store_product_category', [
	'withdrawal_limit',
	'cooldown',
	'friends',
	'roles',
	'message'
])

export const statusEnum = pgEnum('status', [
	'pending',
	'paid',
	'failed',
	'cancelled'
])

export const billingCycleEnum = pgEnum('billing_cycle', [
	'permanent',
	'monthly',
	'quaterly',
	'semi-annually',
	'annually'
])

export const actionTypeEnum = pgEnum('action_type', [
	'warn',
	'suspend',
	'terminate'
])