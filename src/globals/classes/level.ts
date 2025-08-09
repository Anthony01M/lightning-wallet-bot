
import { Storage } from "@/globals/storage"

export interface UserLevel {
	level: number
	requiredProducts: number
	reward: { satoshi: number }
	name: string
	description: string
}

export interface GuildLevel {
	level: number
	requiredProducts: number
	reward: { satoshi: number }
	name: string
	description: string
}

export class LevelStorage extends Storage {
	constructor() {
		super('level.json')
	}

	async getUserLevels(): Promise<UserLevel[]> {
		const data = await this.load()
		return data.userLevels as UserLevel[]
	}

	async getGuildLevels(): Promise<GuildLevel[]> {
		const data = await this.load()
		return data.guildLevels as GuildLevel[]
	}

	async getUserLevel(level: number): Promise<UserLevel | undefined> {
		const levels = await this.getUserLevels()
		return levels.find((lvl) => lvl.level === level)
	}

	async getGuildLevel(level: number): Promise<GuildLevel | undefined> {
		const levels = await this.getGuildLevels()
		return levels.find((lvl) => lvl.level === level)
	}

	async getNextUserLevel(currentProducts: number): Promise<UserLevel | undefined> {
		const levels = await this.getUserLevels()
		return levels.find((lvl) => currentProducts < lvl.requiredProducts)
	}

	async getNextGuildLevel(currentProducts: number): Promise<GuildLevel | undefined> {
		const levels = await this.getGuildLevels()
		return levels.find((lvl) => currentProducts < lvl.requiredProducts)
	}
}
