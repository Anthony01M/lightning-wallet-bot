import { eq } from "drizzle-orm"

import database from "@/globals/database"
import cache from "@/globals/cache"

import { UserSettingStorage } from "@/globals/classes/user/setting"
import { UserStoreStorage } from "@/globals/classes/user/store"
import { UserLevelStorage } from "@/globals/classes/user/level"

export class User {
	constructor(public discordId: string) {
		this._numericId = null
		this._settings = null
		this._level = null
		this._wallets = null
		this.levelStorage = new UserLevelStorage()
		this.settingStorage = new UserSettingStorage()
		this.storeStorage = new UserStoreStorage()
	}

	private _numericId: number | null
	private _settings: any | null
	private _level: number | null
	private _wallets: any[] | null
	readonly levelStorage: UserLevelStorage
	readonly settingStorage: UserSettingStorage
	readonly storeStorage: UserStoreStorage

	async exists(): Promise<boolean> {
		return await cache.use(`user:exists:${this.discordId}`, async () => {
			const result = await database.query.user.findFirst({
				where: eq(database.schema.user.discordId, this.discordId)
			})
			return !!result
		}, 60 * 1000)
	}

	async getId(): Promise<number | null> {
		if (this._numericId !== null) return this._numericId
		const cacheKey = `user:id:${this.discordId}`,
			id = await cache.use(cacheKey, async () => {
				const result = await database.query.user.findFirst({
					where: eq(database.schema.user.discordId, this.discordId)
				})
				return result ? result.id : null
			}, 60 * 60 * 1000)
		this._numericId = id
		return id
	}

	async createIfNotExists(data: object = {}): Promise<void> {
		if (await this.exists()) return
		await database.insert(database.schema.user).values({ discordId: this.discordId, ...data })
		this._numericId = null
	}

	async getSettings(): Promise<any | null> {
		if (this._settings) return this._settings
		const id = await this.getId()
		if (id === null) return null
		const cacheKey = `user:settings:${id}`,
			result = await cache.use(cacheKey, async () => {
				return await database.query.userSetting.findFirst({
					where: eq(database.schema.userSetting.userId, id)
				})
			}, 10 * 60 * 1000)
		this._settings = result
		return result
	}

	async getBalances(): Promise<Array<{ currency: string, amount: string }>> {
		const id = await this.getId()
		if (id === null) return []
		const cacheKey = `user:balances:${id}`,
			results = await cache.use(cacheKey, async () => {
				return await database.query.userBalance.findMany({
					where: eq(database.schema.userBalance.userId, id)
				})
			}, 10 * 60 * 1000)
		return results.map((b: any) => ({ currency: b.currency, amount: b.amount }))
	}

	async addExperiencePoints(points: number): Promise<void> {
		const id = await this.getId()
		if (id === null) return
		await database.transaction(async (tx) => {
			const currentLevel = await tx.query.userLevel.findFirst({
				where: eq(database.schema.userLevel.userId, id)
			})
			if (currentLevel) {
				const newXp: number = currentLevel.xp + points
				await tx.update(database.schema.userLevel)
					.set({ xp: newXp })
					.where(eq(database.schema.userLevel.userId, id))
			} else {
				await tx.insert(database.schema.userLevel).values({
					userId: id,
					level: 1,
					xp: points,
					updatedAt: new Date()
				})
			}
			await cache.del(`user:levelProgress:${id}`)
			await cache.del(`user:availableLevelRewards:${id}`)
		})
	}

	async setLevel(level: number): Promise<void> {
		const id = await this.getId()
		if (id === null) return
		await database.update(database.schema.userLevel)
			.set({ level })
			.where(eq(database.schema.userLevel.userId, id))
		await cache.del(`user:level:${id}`)
		await cache.del(`user:levelProgress:${id}`)
		await cache.del(`user:availableLevelRewards:${id}`)
	}

	async getLevel(): Promise<number> {
		if (this._level !== null) return this._level
		const id = await this.getId()
		if (id === null) return 1
		const cacheKey = `user:level:${id}`,
			result = await cache.use(cacheKey, async () => {
				return await database.query.userLevel.findFirst({
					where: eq(database.schema.userLevel.userId, id)
				})
			}, 10 * 60 * 1000)
		this._level = result ? result.level : 1
		return this._level
	}

	async getLevelProgress(): Promise<{ level: number, xp: number }> {
		const id = await this.getId()
		if (id === null) return { level: 1, xp: 0 }
		const cacheKey = `user:levelProgress:${id}`,
			result = await cache.use(cacheKey, async () => {
				return await database.query.userLevel.findFirst({
					where: eq(database.schema.userLevel.userId, id)
				})
			}, 10 * 60 * 1000)
		return result ? { level: result.level, xp: result.xp } : { level: 1, xp: 0 }
	}

	async getAvailableLevelRewards(): Promise<Array<{ level: number, reward: any }>> {
		const id = await this.getId()
		if (id === null) return []
		const currentLevel = await this.getLevel(),
			claimed = await database.query.userLevelClaim.findMany({
				where: eq(database.schema.userLevelClaim.userId, id)
			}),
			claimedLevels = new Set(claimed.map((c: any) => c.level)),
			allLevels = await this.levelStorage.getLevels()
		return allLevels
			.filter((lvl: any) => lvl.level <= currentLevel && !claimedLevels.has(lvl.level) && lvl.reward && lvl.reward.satoshi)
			.map((lvl: any) => ({ level: lvl.level, reward: lvl.reward }))
	}
}