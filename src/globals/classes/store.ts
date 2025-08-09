import { Storage } from "@/globals/storage"

export class StoreStorage extends Storage {
    constructor() {
        super('store.json')
    }

    async getUserProducts() {
        const data = await this.load()
        return data.userProducts
    }

    async getGuildProducts() {
        const data = await this.load()
        return data.guildProducts
    }

    async getUserProduct(id: string) {
        const products = await this.getUserProducts()
        return products.find((product: any) => product.id === id)
    }

    async getGuildProduct(id: string) {
        const products = await this.getGuildProducts()
        return products.find((product: any) => product.id === id)
    }
}