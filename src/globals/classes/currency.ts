import { Storage } from "@/globals/storage"

export interface Currency {
	name: string
	symbol: string
	decimals: number
	isStablecoin: boolean
}

export class CurrencyStorage extends Storage<Record<string, Currency>> {
	constructor() {
		super('currency.json')
	}

	async getCurrencies(): Promise<Record<string, Currency>> {
		return await this.load()
	}

	async getCurrency(id: string): Promise<Currency | undefined> {
		const all = await this.getCurrencies()
		return all[id]
	}

	async format(amount: number | string | bigint, currencyId: string): Promise<string> {
		const currency = await this.getCurrency(currencyId)
		if (!currency) return String(amount)
		const decimals = currency.decimals ?? 0
		let v = typeof amount === 'bigint' ? amount : BigInt(String(amount))
		const negative = v < 0n
		if (negative) v = -v
		if (decimals === 0) return `${negative ? '-' : ''}${v.toString()} ${currency.symbol}`
		const base = 10n ** BigInt(decimals),
			whole = v / base,
			frac = v % base,
			fracStr = frac.toString().padStart(decimals, '0').replace(/0+$/, '')
		return `${negative ? '-' : ''}${whole.toString()}${fracStr ? '.' + fracStr : ''} ${currency.symbol}`
	}

	async parse(amount: string, currencyId: string): Promise<bigint> {
		const currency = await this.getCurrency(currencyId),
			decimals = currency?.decimals ?? 0,
			negative = amount.trim().startsWith('-'),
			cleaned = amount.trim().replace(/[^0-9.\-]/g, ''),
			parts = cleaned.split('.'),
			whole = parts[0] ? BigInt(parts[0].replace('-', '') || '0') : 0n,
			frac = parts[1] ? parts[1].slice(0, decimals).padEnd(decimals, '0') : ''.padEnd(decimals, '0'),
			value = whole * (10n ** BigInt(decimals)) + BigInt(frac || '0')
		return negative ? -value : value
	}
}

export default new CurrencyStorage()