CREATE TYPE "public"."action_type" AS ENUM('warn', 'suspend', 'terminate');--> statement-breakpoint
CREATE TYPE "public"."billing_cycle" AS ENUM('permanent', 'monthly', 'quaterly', 'semi-annually', 'annually');--> statement-breakpoint
CREATE TYPE "public"."code_status" AS ENUM('active', 'claimed', 'expired');--> statement-breakpoint
CREATE TYPE "public"."currency" AS ENUM('satoshi', 'usdt', 'usdc');--> statement-breakpoint
CREATE TYPE "public"."friend_request_status" AS ENUM('pending', 'accepted', 'declined');--> statement-breakpoint
CREATE TYPE "public"."provider" AS ENUM('speed_wallet');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'paid', 'failed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."store_product_category" AS ENUM('withdrawal_limit', 'cooldown', 'friends', 'roles', 'message');--> statement-breakpoint
CREATE TYPE "public"."transaction_status" AS ENUM('pending', 'completed', 'failed', 'cancelled');--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"discord_id" varchar(32) NOT NULL,
	"registered_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_discord_id_unique" UNIQUE("discord_id")
);
--> statement-breakpoint
CREATE TABLE "user_action" (
	"id" serial PRIMARY KEY NOT NULL,
	"admin_id" integer,
	"user_id" integer,
	"discord_id" varchar(32),
	"type" "action_type" NOT NULL,
	"reason" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_boost" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"guild_id" text NOT NULL,
	"duration_months" integer NOT NULL,
	"currency" "currency" NOT NULL,
	"amount_paid" numeric(20, 8) NOT NULL,
	"starts_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_block" (
	"id" serial PRIMARY KEY NOT NULL,
	"blocker_id" integer NOT NULL,
	"blocked_id" integer NOT NULL,
	"blocked_discord_id" varchar(32),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_balance" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"currency" "currency" NOT NULL,
	"amount" numeric(20, 8) DEFAULT '0' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_deposit" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"currency" "currency" NOT NULL,
	"amount" numeric(20, 8) NOT NULL,
	"status" "transaction_status" DEFAULT 'pending' NOT NULL,
	"lightning_invoice" text NOT NULL,
	"external_transaction_id" text,
	"expires_at" timestamp NOT NULL,
	"requested_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_withdraw" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"wallet_id" integer NOT NULL,
	"currency" "currency" NOT NULL,
	"amount" numeric(20, 8) NOT NULL,
	"fee" numeric(20, 8) DEFAULT '0',
	"status" "transaction_status" DEFAULT 'pending' NOT NULL,
	"external_transaction_id" text,
	"requested_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_setting" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"public" boolean DEFAULT true NOT NULL,
	"allow_friend_requests" boolean DEFAULT true NOT NULL,
	"allow_friend_request_dms" boolean DEFAULT true NOT NULL,
	"custom_block_message" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_wallet" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"provider" "provider" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_wallet_currency" (
	"id" serial PRIMARY KEY NOT NULL,
	"wallet_id" integer NOT NULL,
	"currency" "currency" NOT NULL,
	"wallet_address" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_friend" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"friend_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_friend_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"from_user_id" integer NOT NULL,
	"to_user_id" integer NOT NULL,
	"status" "friend_request_status" DEFAULT 'pending' NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"responded_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_level" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_level_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "user_level_claim" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"level" integer NOT NULL,
	"claimed_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_level_claim_user_id_level_unique" UNIQUE("user_id","level")
);
--> statement-breakpoint
CREATE TABLE "user_store_purchase" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"product_id" text NOT NULL,
	"product_category" "store_product_category" NOT NULL,
	"tier" integer,
	"currency" "currency" NOT NULL,
	"price_paid" numeric(20, 8) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"purchased_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp,
	"last_renewed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_store_subscription" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"product_id" text NOT NULL,
	"product_category" "store_product_category" NOT NULL,
	"currency" "currency" NOT NULL,
	"recurring_price" numeric(20, 8) NOT NULL,
	"billing_cycle" "billing_cycle" NOT NULL,
	"is_auto_renew" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"next_billing_at" timestamp NOT NULL,
	"cancelled_at" timestamp,
	"last_charged_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_store_invoice" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"subscription_id" integer,
	"product_id" text NOT NULL,
	"amount" numeric(20, 8) NOT NULL,
	"currency" "currency" NOT NULL,
	"status" "status" NOT NULL,
	"due_date" timestamp NOT NULL,
	"paid_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tip" (
	"id" serial PRIMARY KEY NOT NULL,
	"from_user_id" integer NOT NULL,
	"to_user_id" integer NOT NULL,
	"to_discord_id" varchar(32),
	"currency" "currency" NOT NULL,
	"amount" numeric(20, 8) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drop" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_by_user_id" integer NOT NULL,
	"currency" "currency" NOT NULL,
	"total_amount" numeric(20, 8) NOT NULL,
	"remaining_amount" numeric(20, 8) NOT NULL,
	"max_participants" integer,
	"current_participants" integer DEFAULT 0 NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "drop_participant" (
	"id" serial PRIMARY KEY NOT NULL,
	"drop_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"amount_received" numeric(20, 8) NOT NULL,
	"participated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "minedrop" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_by_user_id" integer NOT NULL,
	"currency" "currency" NOT NULL,
	"amount" numeric(20, 8) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "minedrop_participants" (
	"id" serial PRIMARY KEY NOT NULL,
	"minedrop_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"grid_position" integer NOT NULL,
	"is_bomb" boolean NOT NULL,
	"amount_received" numeric(20, 8) DEFAULT '0' NOT NULL,
	"participated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rain" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_by_user_id" integer NOT NULL,
	"currency" "currency" NOT NULL,
	"total_amount" numeric(20, 8) NOT NULL,
	"max_participants" integer NOT NULL,
	"current_participants" integer DEFAULT 0 NOT NULL,
	"is_per_person_amount" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "rain_participant" (
	"id" serial PRIMARY KEY NOT NULL,
	"rain_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"amount_received" numeric(20, 8) NOT NULL,
	"participated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "redpacket" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_by_user_id" integer NOT NULL,
	"claimed_by_user_id" integer,
	"claimed_discord_id" varchar(32),
	"currency" "currency" NOT NULL,
	"amount" numeric(20, 8) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"claimed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "code_generation" (
	"id" serial PRIMARY KEY NOT NULL,
	"creator_id" integer NOT NULL,
	"code" text NOT NULL,
	"currency" "currency" NOT NULL,
	"amount" numeric(20, 8) NOT NULL,
	"status" "code_status" DEFAULT 'active' NOT NULL,
	"max_redemptions" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp,
	CONSTRAINT "code_generation_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "code_redemption" (
	"id" serial PRIMARY KEY NOT NULL,
	"code_id" integer NOT NULL,
	"redeemer_id" integer NOT NULL,
	"redeemed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guild" (
	"id" serial PRIMARY KEY NOT NULL,
	"discord_id" varchar(32) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "guild_discord_id_unique" UNIQUE("discord_id")
);
--> statement-breakpoint
CREATE TABLE "guild_action" (
	"id" serial PRIMARY KEY NOT NULL,
	"guild_id" integer,
	"discord_id" varchar(32),
	"admin_id" integer,
	"type" "action_type" NOT NULL,
	"reason" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "guild_setting" (
	"id" serial PRIMARY KEY NOT NULL,
	"guild_id" integer NOT NULL,
	"store_enabled" boolean DEFAULT false NOT NULL,
	"thank_you_enabled" boolean DEFAULT true NOT NULL,
	"thank_you_message" text,
	"audit_log_channel_id" text,
	"booster_role_id" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guild_balance" (
	"id" serial PRIMARY KEY NOT NULL,
	"guild_id" integer NOT NULL,
	"currency" "currency" NOT NULL,
	"amount" numeric(20, 8) DEFAULT '0' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guild_deposit" (
	"id" serial PRIMARY KEY NOT NULL,
	"guild_id" integer NOT NULL,
	"from_user_id" integer NOT NULL,
	"currency" "currency" NOT NULL,
	"amount" numeric(20, 8) NOT NULL,
	"status" "transaction_status" DEFAULT 'pending' NOT NULL,
	"lightning_invoice" text,
	"external_transaction_id" text,
	"expires_at" timestamp,
	"requested_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "guild_withdraw" (
	"id" serial PRIMARY KEY NOT NULL,
	"guild_id" integer NOT NULL,
	"to_user_id" integer NOT NULL,
	"currency" "currency" NOT NULL,
	"amount" numeric(20, 8) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guild_level" (
	"id" serial PRIMARY KEY NOT NULL,
	"guild_id" integer NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guild_level_claim" (
	"id" serial PRIMARY KEY NOT NULL,
	"guild_id" integer NOT NULL,
	"level" integer NOT NULL,
	"claimed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guild_store_purchase" (
	"id" serial PRIMARY KEY NOT NULL,
	"guild_id" integer NOT NULL,
	"product_id" text NOT NULL,
	"product_category" "store_product_category" NOT NULL,
	"tier" integer,
	"currency" "currency" NOT NULL,
	"price_paid" numeric(20, 8) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"purchased_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp,
	"last_renewed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "guild_store_subscription" (
	"id" serial PRIMARY KEY NOT NULL,
	"guild_id" integer NOT NULL,
	"product_id" text NOT NULL,
	"product_category" "store_product_category" NOT NULL,
	"currency" "currency" NOT NULL,
	"recurring_price" numeric(20, 8) NOT NULL,
	"billing_cycle" "billing_cycle" NOT NULL,
	"is_auto_renew" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"next_billing_at" timestamp NOT NULL,
	"cancelled_at" timestamp,
	"last_charged_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "guild_store_invoice" (
	"id" serial PRIMARY KEY NOT NULL,
	"guild_id" integer NOT NULL,
	"subscription_id" integer,
	"product_id" text NOT NULL,
	"amount" numeric(20, 8) NOT NULL,
	"currency" "currency" NOT NULL,
	"status" "status" NOT NULL,
	"due_date" timestamp NOT NULL,
	"paid_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guild_sellable_role" (
	"id" serial PRIMARY KEY NOT NULL,
	"guild_id" integer NOT NULL,
	"role_id" varchar(32) NOT NULL,
	"description" text,
	"price_satoshi" integer,
	"price_usd" integer,
	"is_subscription" boolean DEFAULT false NOT NULL,
	"subscription_period" text,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guild_role_purchase" (
	"id" serial PRIMARY KEY NOT NULL,
	"guild_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	"purchased_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp,
	"is_active" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_action" ADD CONSTRAINT "user_action_admin_id_user_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_action" ADD CONSTRAINT "user_action_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_boost" ADD CONSTRAINT "user_boost_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_block" ADD CONSTRAINT "user_block_blocker_id_user_id_fk" FOREIGN KEY ("blocker_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_block" ADD CONSTRAINT "user_block_blocked_id_user_id_fk" FOREIGN KEY ("blocked_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_balance" ADD CONSTRAINT "user_balance_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_deposit" ADD CONSTRAINT "user_deposit_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_withdraw" ADD CONSTRAINT "user_withdraw_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_withdraw" ADD CONSTRAINT "user_withdraw_wallet_id_user_wallet_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."user_wallet"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_setting" ADD CONSTRAINT "user_setting_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_wallet" ADD CONSTRAINT "user_wallet_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_wallet_currency" ADD CONSTRAINT "user_wallet_currency_wallet_id_user_wallet_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."user_wallet"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_friend" ADD CONSTRAINT "user_friend_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_friend" ADD CONSTRAINT "user_friend_friend_id_user_id_fk" FOREIGN KEY ("friend_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_friend_request" ADD CONSTRAINT "user_friend_request_from_user_id_user_id_fk" FOREIGN KEY ("from_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_friend_request" ADD CONSTRAINT "user_friend_request_to_user_id_user_id_fk" FOREIGN KEY ("to_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_level" ADD CONSTRAINT "user_level_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_level_claim" ADD CONSTRAINT "user_level_claim_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_store_purchase" ADD CONSTRAINT "user_store_purchase_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_store_subscription" ADD CONSTRAINT "user_store_subscription_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_store_invoice" ADD CONSTRAINT "user_store_invoice_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_store_invoice" ADD CONSTRAINT "user_store_invoice_subscription_id_user_store_subscription_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."user_store_subscription"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tip" ADD CONSTRAINT "tip_from_user_id_user_id_fk" FOREIGN KEY ("from_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tip" ADD CONSTRAINT "tip_to_user_id_user_id_fk" FOREIGN KEY ("to_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drop" ADD CONSTRAINT "drop_created_by_user_id_user_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drop_participant" ADD CONSTRAINT "drop_participant_drop_id_drop_id_fk" FOREIGN KEY ("drop_id") REFERENCES "public"."drop"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drop_participant" ADD CONSTRAINT "drop_participant_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "minedrop" ADD CONSTRAINT "minedrop_created_by_user_id_user_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "minedrop_participants" ADD CONSTRAINT "minedrop_participants_minedrop_id_minedrop_id_fk" FOREIGN KEY ("minedrop_id") REFERENCES "public"."minedrop"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "minedrop_participants" ADD CONSTRAINT "minedrop_participants_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rain" ADD CONSTRAINT "rain_created_by_user_id_user_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rain_participant" ADD CONSTRAINT "rain_participant_rain_id_rain_id_fk" FOREIGN KEY ("rain_id") REFERENCES "public"."rain"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rain_participant" ADD CONSTRAINT "rain_participant_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "redpacket" ADD CONSTRAINT "redpacket_created_by_user_id_user_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "redpacket" ADD CONSTRAINT "redpacket_claimed_by_user_id_user_id_fk" FOREIGN KEY ("claimed_by_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "code_generation" ADD CONSTRAINT "code_generation_creator_id_user_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "code_redemption" ADD CONSTRAINT "code_redemption_code_id_code_generation_id_fk" FOREIGN KEY ("code_id") REFERENCES "public"."code_generation"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "code_redemption" ADD CONSTRAINT "code_redemption_redeemer_id_user_id_fk" FOREIGN KEY ("redeemer_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_action" ADD CONSTRAINT "guild_action_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_action" ADD CONSTRAINT "guild_action_admin_id_user_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_setting" ADD CONSTRAINT "guild_setting_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_balance" ADD CONSTRAINT "guild_balance_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_deposit" ADD CONSTRAINT "guild_deposit_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_deposit" ADD CONSTRAINT "guild_deposit_from_user_id_user_id_fk" FOREIGN KEY ("from_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_withdraw" ADD CONSTRAINT "guild_withdraw_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_withdraw" ADD CONSTRAINT "guild_withdraw_to_user_id_user_id_fk" FOREIGN KEY ("to_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_level" ADD CONSTRAINT "guild_level_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_level_claim" ADD CONSTRAINT "guild_level_claim_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_store_purchase" ADD CONSTRAINT "guild_store_purchase_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_store_subscription" ADD CONSTRAINT "guild_store_subscription_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_store_invoice" ADD CONSTRAINT "guild_store_invoice_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_store_invoice" ADD CONSTRAINT "guild_store_invoice_subscription_id_guild_store_subscription_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."guild_store_subscription"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_sellable_role" ADD CONSTRAINT "guild_sellable_role_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_role_purchase" ADD CONSTRAINT "guild_role_purchase_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_role_purchase" ADD CONSTRAINT "guild_role_purchase_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_role_purchase" ADD CONSTRAINT "guild_role_purchase_role_id_guild_sellable_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."guild_sellable_role"("id") ON DELETE no action ON UPDATE no action;