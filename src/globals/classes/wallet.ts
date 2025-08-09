import { Storage } from "@/globals/storage"

export class WalletStorage extends Storage {
    constructor() {
        super('wallet.json')
    }

    async getSupportedWallets() {
        const data = await this.load()
        return data.supportedWallets
    }

    async getDefaultWallet() {
        const wallets = await this.getSupportedWallets()
        return wallets.find((wallet: any) => wallet.isDefault)
    }

    async getWallet(id: string) {
        const wallets = await this.getSupportedWallets()
        return wallets.find((wallet: any) => wallet.id === id)
    }

    async getDefaultSettings() {
        const data = await this.load()
        return data.defaultSettings
    }

    async getCurrencies() {
        const data = await this.load()
        return data.currencies
    }

    async getCurrency(id: string) {
        const currencies = await this.getCurrencies()
        return currencies[id]
    }
}