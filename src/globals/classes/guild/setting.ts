import { Storage } from "@/globals/storage"

export interface GuildSetting {
	[key: string]: any
}

export class GuildSettingStorage extends Storage<GuildSetting> {
	constructor() {
		super("guild/setting.json")
	}

	async getSettings(): Promise<GuildSetting> {
		return await this.load()
	}
}