import { Storage } from "@/globals/storage"

export interface UserSetting {
	[key: string]: any
}

export class UserSettingStorage extends Storage<UserSetting> {
	constructor() {
		super("user/setting.json")
	}

	async getSettings(): Promise<UserSetting> {
		return await this.load()
	}
}