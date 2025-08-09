import { Storage } from "@/globals/storage"

export class BoostStorage extends Storage {
	constructor() {
		super('boost.json')
	}

	async getBoosts() {
		return await this.load()
	}

	async getBoostByTimeFrame(timeFrame: string) {
		const boosts = await this.getBoosts()
		return boosts.find((boost: any) => boost.timeFrame === timeFrame)
	}

	async getBoostByDuration(months: number) {
		const boosts = await this.getBoosts()
		return boosts.find((boost: any) => boost.durationMonths === months)
	}
}