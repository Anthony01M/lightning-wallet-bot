import { Storage } from "@/globals/storage"

export interface UserStoreProductTier {
	tier: number
	cap?: number
	priceSatoshi?: number
	priceUsd?: number
	time?: number
}

export interface UserStoreProduct {
	id: string
	name: string
	description: string
	category: string
	currency?: string
	maxTier?: number
	tiers?: UserStoreProductTier[]
}

export class UserStoreStorage extends Storage<UserStoreProduct[]> {
	constructor() {
		super("user/store.json")
	}

	async getProducts(): Promise<UserStoreProduct[]> {
		return await this.load()
	}

	async getProductById(id: string): Promise<UserStoreProduct | undefined> {
		const products = await this.getProducts()
		return products.find(prod => prod.id === id)
	}
}