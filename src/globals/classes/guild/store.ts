import { Storage } from "@/globals/storage"

export interface GuildStoreProductTier {
	tier: number
	amount?: number
	priceSatoshi?: number
	priceUsd?: number
}

export interface GuildStoreProduct {
	id: string
	name: string
	description: string
	category: string
	maxTier?: number
	tiers?: GuildStoreProductTier[]
	priceSatoshi?: number
	priceUsd?: number
	isPermanent?: boolean
}

export class GuildStoreStorage extends Storage<GuildStoreProduct[]> {
	constructor() {
		super("guild/store.json")
	}

	async getProducts(): Promise<GuildStoreProduct[]> {
		return await this.load()
	}

	async getProductById(id: string): Promise<GuildStoreProduct | undefined> {
		const products = await this.getProducts()
		return products.find(prod => prod.id === id)
	}
}