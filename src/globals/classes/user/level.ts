import { Storage } from "@/globals/storage"

export interface UserLevel {
	level: number
	require: { product: number }
	reward: { satoshi: number }
	name: string
}

export class UserLevelStorage extends Storage<UserLevel[]> {
	constructor() {
		super("user/level.json")
	}

	async getLevels(): Promise<UserLevel[]> {
		return await this.load()
	}

	async getLevel(level: number): Promise<UserLevel | undefined> {
		const levels = await this.getLevels()
		return levels.find(lvl => lvl.level === level)
	}
}