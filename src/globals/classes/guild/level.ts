import { Storage } from "@/globals/storage"

export interface GuildLevel {
	level: number
	require: { product: number }
	reward: { satoshi: number }
	name: string
}

export class GuildLevelStorage extends Storage<GuildLevel[]> {
	constructor() {
		super("guild/level.json")
	}

	async getLevels(): Promise<GuildLevel[]> {
		return await this.load()
	}

	async getLevel(level: number): Promise<GuildLevel | undefined> {
		const levels = await this.getLevels()
		return levels.find(lvl => lvl.level === level)
	}
}