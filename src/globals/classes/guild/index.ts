import { and, eq } from "drizzle-orm"

import database from "@/globals/database"
import cache from "@/globals/cache"

import { GuildSettingStorage } from "@/globals/classes/guild/setting"
import { GuildStoreStorage } from "@/globals/classes/guild/store"
import { GuildLevelStorage } from "@/globals/classes/guild/level"

export class Guild {
	constructor(public discordId: string) {
		this._numericId = null
		this._settings = null
		this._level = null
		this._roles = null
		this.levelStorage = new GuildLevelStorage()
		this.settingStorage = new GuildSettingStorage()
		this.storeStorage = new GuildStoreStorage()
	}

	private _numericId: number | null
	private _settings: any | null
	private _level: number | null
	private _roles: any[] | null
	readonly levelStorage: GuildLevelStorage
	readonly settingStorage: GuildSettingStorage
	readonly storeStorage: GuildStoreStorage

	async exists(): Promise<boolean> {
		return await cache.use(`guild:exists:${this.discordId}`, async () => {
			const result = await database.query.guild.findFirst({
				where: eq(database.schema.guild.discordId, this.discordId)
			})
			return !!result
		}, 60 * 1000)
	}

	async getId(): Promise<number | null> {
		if (this._numericId !== null) return this._numericId
		const cacheKey = `guild:id:${this.discordId}`,
			id = await cache.use(cacheKey, async () => {
				const result = await database.query.guild.findFirst({
					where: eq(database.schema.guild.discordId, this.discordId)
				})
				return result ? result.id : null
			}, 60 * 60 * 1000)
		this._numericId = id
		return id
	}

	async createIfNotExists(data: object): Promise<void> {
		if (await this.exists()) return
		await database.insert(database.schema.guild).values({ discordId: this.discordId, ...data })
		this._numericId = null
	}

	async getSettings(): Promise<any | null> {
		if (this._settings) return this._settings
		const id = await this.getId()
		if (id === null) return null
		const cacheKey = `guild:settings:${id}`,
			result = await cache.use(cacheKey, async () => {
				return await database.query.guildSetting.findFirst({
					where: eq(database.schema.guildSetting.guildId, id)
				})
			}, 10 * 60 * 1000)
		this._settings = result
		return result
	}

	async getBalances(): Promise<Array<{ currency: string, amount: string }>> {
		const id = await this.getId()
		if (id === null) return []
		const cacheKey = `guild:balances:${id}`,
			results = await cache.use(cacheKey, async () => {
				return await database.query.guildBalance.findMany({
					where: eq(database.schema.guildBalance.guildId, id)
				})
			}, 10 * 60 * 1000)
		return results.map((b: any) => ({ currency: b.currency, amount: b.amount }))
	}

	async addExperiencePoints(points: number): Promise<void> {
		const id = await this.getId()
		if (id === null) return
		await database.transaction(async (tx) => {
			const currentLevel = await tx.query.guildLevel.findFirst({
				where: eq(database.schema.guildLevel.guildId, id)
			})
			if (currentLevel) {
				const newXp: number = currentLevel.xp + points
				await tx.update(database.schema.guildLevel)
					.set({ xp: newXp })
					.where(eq(database.schema.guildLevel.guildId, id))
			} else {
				await tx.insert(database.schema.guildLevel).values({
					guildId: id,
					level: 1,
					xp: points,
					updatedAt: new Date()
				})
			}
			await cache.del(`guild:levelProgress:${id}`)
			await cache.del(`guild:availableLevelRewards:${id}`)
		})
	}

	async setLevel(level: number): Promise<void> {
		const id = await this.getId()
		if (id === null) return
		await database.update(database.schema.guildLevel)
			.set({ level })
			.where(eq(database.schema.guildLevel.guildId, id))
		await cache.del(`guild:level:${id}`)
		await cache.del(`guild:levelProgress:${id}`)
		await cache.del(`guild:availableLevelRewards:${id}`)
	}

	async getLevel(): Promise<number> {
		if (this._level !== null) return this._level
		const id = await this.getId()
		if (id === null) return 1
		const cacheKey = `guild:level:${id}`,
			result = await cache.use(cacheKey, async () => {
				return await database.query.guildLevel.findFirst({
					where: eq(database.schema.guildLevel.guildId, id)
				})
			}, 10 * 60 * 1000)
		this._level = result ? result.level : 1
		return this._level
	}

	async getLevelProgress(): Promise<{ level: number, xp: number }> {
		const id = await this.getId()
		if (id === null) return { level: 1, xp: 0 }
		const cacheKey = `guild:levelProgress:${id}`,
			result = await cache.use(cacheKey, async () => {
				return await database.query.guildLevel.findFirst({
					where: eq(database.schema.guildLevel.guildId, id)
				})
			}, 10 * 60 * 1000)
		return result ? { level: result.level, xp: result.xp } : { level: 1, xp: 0 }
	}

	async getAvailableLevelRewards(): Promise<Array<{ level: number, reward: any }>> {
		const id = await this.getId()
		if (id === null) return []
		const currentLevel = await this.getLevel(),
			claimed = await database.query.guildLevelClaim.findMany({
				where: eq(database.schema.guildLevelClaim.guildId, id)
			}),
			claimedLevels = new Set(claimed.map((c: any) => c.level)),
			allLevels = await this.levelStorage.getLevels()
		return allLevels
			.filter((lvl: any) => lvl.level <= currentLevel && !claimedLevels.has(lvl.level) && lvl.reward && lvl.reward.satoshi)
			.map((lvl: any) => ({ level: lvl.level, reward: lvl.reward }))
	}

	async getThankYouMessage(): Promise<string | null> {
		const settings = await this.getSettings()
		if (!settings) return null
		if (settings.thankYouMessage) return settings.thankYouMessage
		if (settings.store && settings.store.purchase && settings.store.purchase.message)
			return settings.store.purchase.message
		return null
	}

	async setThankYouMessage(msg: string): Promise<void> {
		const id = await this.getId()
		if (id === null) return
		await database.update(database.schema.guildSetting)
			.set({ thankYouMessage: msg })
			.where(eq(database.schema.guildSetting.guildId, id))
	}

	async setAuditLogChannel(channelId: string): Promise<void> {
		const id = await this.getId()
		if (id === null) return
		await database.update(database.schema.guildSetting)
			.set({ auditLogChannelId: channelId })
			.where(eq(database.schema.guildSetting.guildId, id))
	}

	async getBoosterRole(): Promise<string | null> {
		const id = await this.getId()
		if (id === null) return null
		const cacheKey = `guild:boosterRole:${id}`,
			result = await cache.use(cacheKey, async () => {
				const setting = await database.query.guildSetting.findFirst({
					where: eq(database.schema.guildSetting.guildId, id)
				})
				return setting ? setting.boosterRoleId : null
			}, 10 * 60 * 1000)
		return result
	}

	async setBoosterRole(roleId: string): Promise<void> {
		const id = await this.getId()
		if (id === null) return
		await database.update(database.schema.guildSetting)
			.set({ boosterRoleId: roleId })
			.where(eq(database.schema.guildSetting.guildId, id))
		await cache.del(`guild:boosterRole:${id}`)
	}

	async getStoreStatus(): Promise<boolean> {
		const id = await this.getId()
		if (id === null) return false
		const cacheKey = `guild:storeStatus:${id}`,
			result = await cache.use(cacheKey, async () => {
				const setting = await database.query.guildSetting.findFirst({
					where: eq(database.schema.guildSetting.guildId, id)
				})
				return setting ? setting.storeEnabled : false
			}, 10 * 60 * 1000)
		return result
	}

	async enableStore(): Promise<void> {
		const id = await this.getId()
		if (id === null) return
		await database.update(database.schema.guildSetting)
			.set({ storeEnabled: true })
			.where(eq(database.schema.guildSetting.guildId, id))
		await cache.del(`guild:storeStatus:${id}`)
	}

	async disableStore(): Promise<void> {
		const id = await this.getId()
		if (id === null) return
		await database.update(database.schema.guildSetting)
			.set({ storeEnabled: false })
			.where(eq(database.schema.guildSetting.guildId, id))
		await cache.del(`guild:storeStatus:${id}`)
	}

	async claimLevelReward(level: number): Promise<boolean> {
		const id = await this.getId()
		if (id === null) return false
		const alreadyClaimed = await database.query.guildLevelClaim.findFirst({
			where: and(
				eq(database.schema.guildLevelClaim.guildId, id),
				eq(database.schema.guildLevelClaim.level, level)
			)
		})
		if (alreadyClaimed) return false
		const currentLevel = await this.getLevel()
		if (currentLevel < level) return false
		const levelInfo = await this.levelStorage.getLevel(level)
		if (!levelInfo || !levelInfo.reward || !levelInfo.reward.satoshi) return false
		const balance = await database.query.guildBalance.findFirst({
			where: eq(database.schema.guildBalance.guildId, id)
		}),
			newAmount = balance
				? (BigInt(balance.amount) + BigInt(levelInfo.reward.satoshi)).toString()
				: levelInfo.reward.satoshi.toString()
		if (balance) {
			await database.update(database.schema.guildBalance)
				.set({ amount: newAmount })
				.where(eq(database.schema.guildBalance.guildId, id))
		} else {
			await database.insert(database.schema.guildBalance)
				.values({ guildId: id, amount: newAmount, currency: "satoshi" })
		}
		await database.insert(database.schema.guildLevelClaim)
			.values({ guildId: id, level })
		await cache.del(`guild:levelProgress:${id}`)
		await cache.del(`guild:availableLevelRewards:${id}`)
		return true
	}

	async getSellableRoles(): Promise<any[]> {
		if (this._roles) return this._roles
		const id = await this.getId()
		if (id === null) return []
		const cacheKey = `guild:roles:${id}`,
			roles = await cache.use(cacheKey, async () => {
				return await database.query.guildSellableRole.findMany({
					where: eq(database.schema.guildSellableRole.guildId, id)
				})
			}, 10 * 60 * 1000)
		this._roles = roles
		return roles
	}

	async getMaxSellableRoles(): Promise<number> {
		const id = await this.getId()
		if (id === null) return 3
		const purchases = await database.query.guildStorePurchase.findMany({
			where: and(
				eq(database.schema.guildStorePurchase.guildId, id),
				eq(database.schema.guildStorePurchase.productId, "sellable_roles"),
				eq(database.schema.guildStorePurchase.isActive, true)
			)
		})
		let maxTier = 1
		for (const purchase of purchases) {
			if (purchase.tier && purchase.tier > maxTier) maxTier = purchase.tier
		}
		const store = await this.storeStorage.getProductById("sellable_roles")
		if (!store || !store.tiers) return 3
		const tier = store.tiers.find(t => t.tier === maxTier)
		return tier?.amount ?? 3
	}

	async donate(amount: string, userId: number, currency: "satoshi" | "usdt" | "usdc"): Promise<boolean> {
		const id = await this.getId()
		if (id === null) return false
		await database.insert(database.schema.guildDeposit).values({
			guildId: id,
			fromUserId: userId,
			currency,
			amount,
			status: "completed"
		})
		const balance = await database.query.guildBalance.findFirst({
			where: and(
				eq(database.schema.guildBalance.guildId, id),
				eq(database.schema.guildBalance.currency, currency)
			)
		}),
			newAmount = balance
				? (BigInt(balance.amount) + BigInt(amount)).toString()
				: amount
		if (balance) {
			await database.update(database.schema.guildBalance)
				.set({ amount: newAmount })
				.where(and(
					eq(database.schema.guildBalance.guildId, id),
					eq(database.schema.guildBalance.currency, currency)
				))
		} else {
			await database.insert(database.schema.guildBalance)
				.values({ guildId: id, amount: newAmount, currency })
		}
		return true
	}

	async getServerStats(): Promise<any> {
		const id = await this.getId()
		if (id === null) return {}
		const balances = await database.query.guildBalance.findMany({
			where: eq(database.schema.guildBalance.guildId, id)
		}),
			level = await this.getLevel()
		return {
			balances,
			level,
		}
	}
}