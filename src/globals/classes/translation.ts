import fs from "fs/promises"
import path from "path"

import { Storage } from "@/globals/storage"

export type TranslationDomain = 'discord' | 'api' | 'website'
export type RawKeys = Record<string, any>
export type Keys = string

interface LanguageDefinition {
	name: string
	code: string
	flag?: string
	count?: number
}

interface LanguageInfo extends LanguageDefinition {
	progress: number
}

interface DiscordLocaleMapping {
	[locale: string]: string | undefined
	base: string
}

const LOCALE_MAP: Record<string, string> = {
	'id': 'ID',
	'da': 'DA',
	'de': 'DE',
	'en-GB': 'EN_GB',
	'en-US': 'EN_US',
	'es-ES': 'ES_ES',
	'es-419': 'ES_419',
	'fr': 'FR',
	'hr': 'HR',
	'it': 'IT',
	'lt': 'LT',
	'hu': 'HU',
	'nl': 'NL',
	'no': 'NO',
	'pl': 'PL',
	'pt-BR': 'PT_BR',
	'ro': 'RO',
	'fi': 'FI',
	'sv-SE': 'SV_SE',
	'vi': 'VI',
	'tr': 'TR',
	'cs': 'CS',
	'el': 'EL',
	'bg': 'BG',
	'ru': 'RU',
	'uk': 'UK',
	'hi': 'HI',
	'th': 'TH',
	'zh-CN': 'ZH_CN',
	'ja': 'JA',
	'zh-TW': 'ZH_TW',
	'ko': 'KO'
},
	DEFAULT_LANGUAGE = 'EN_US'

class TranslationStorage extends Storage<RawKeys> {
	constructor(filename: string) {
		super(path.join('translation', filename))
	}
}

class Translation {
	private translations: Record<string, [RawKeys, Record<string, string>]> = {}
	private knownLanguages: Record<string, LanguageDefinition & { count: number }> = {}
	private translationDir: string
	private initialized = false

	constructor() {
		this.translationDir = path.join(process.cwd(), 'storage', 'translation')
		this.validateTranslationDirectory()
	}

	private validateTranslationDirectory(): void {
		const exists = require('fs').existsSync(this.translationDir)
		if (!exists) {
			throw new Error(`Translations folder not found: ${this.translationDir}`)
		}
	}

	private flattenObject(obj: Record<string, any>, prefix = ''): Record<string, string> {
		const flattened: Record<string, string> = {}
		for (const [key, value] of Object.entries(obj)) {
			const newKey = prefix ? `${prefix}.${key}` : key
			if (value && typeof value === 'object' && !Array.isArray(value)) {
				Object.assign(flattened, this.flattenObject(value, newKey))
			} else if (value !== null && value !== undefined) {
				flattened[`.${newKey}`] = String(value)
			}
		}
		return flattened
	}

	private countKeys(obj: Record<string, any>): number {
		let count = 0
		for (const value of Object.values(obj)) {
			if (value && typeof value === 'object' && !Array.isArray(value)) {
				count += this.countKeys(value)
			} else {
				count++
			}
		}
		return count
	}

	private normalizeLanguageCode(input: string): string {
		return input.toUpperCase().replace('-', '_')
	}

	private async loadTranslationsFromDirectory(): Promise<void> {
		const dirents = await fs.readdir(this.translationDir, { withFileTypes: true })
		await Promise.all(dirents.map(async (dirent) => {
			try {
				if (dirent.isFile() && dirent.name.endsWith('.json')) {
					const storage = new TranslationStorage(dirent.name),
						content = await storage.load()
					if (content) {
						const code = this.normalizeLanguageCode(path.basename(dirent.name, '.json'))
						this.translations[code] = [content, this.flattenObject(content)]
					}
				} else if (dirent.isDirectory()) {
					const code = this.normalizeLanguageCode(dirent.name),
						content: Record<string, any> = {},
						dirPath = path.join(this.translationDir, dirent.name),
						files = (await fs.readdir(dirPath)).filter(f => f.endsWith('.json'))
					for (const file of files) {
						const storage = new TranslationStorage(path.join(dirent.name, file))
						try {
							const fileContent = await storage.load()
							if (fileContent) {
								const key = path.basename(file, '.json')
								content[key] = fileContent
							}
						} catch { }
					}
					if (Object.keys(content).length > 0) {
						this.translations[code] = [content, this.flattenObject(content)]
					}
				}
			} catch { }
		}))
	}

	private async loadLanguageDefinitions(): Promise<void> {
		for (const code of Object.keys(this.translations)) {
			this.knownLanguages[code] = {
				name: code,
				code,
				flag: '',
				count: this.countKeys(this.translations[code][0])
			}
		}
	}

	public async initialize(): Promise<void> {
		if (this.initialized) return
		await this.loadTranslationsFromDirectory()
		await this.loadLanguageDefinitions()
		this.initialized = true
	}

	public async getTranslationSize(): Promise<number> {
		const dirents = await fs.readdir(this.translationDir, { withFileTypes: true })
		let totalSize = 0
		for (const dirent of dirents) {
			try {
				if (dirent.isFile()) {
					const stat = await fs.stat(path.join(this.translationDir, dirent.name))
					totalSize += stat.size
				} else if (dirent.isDirectory()) {
					const dirPath = path.join(this.translationDir, dirent.name),
						files = (await fs.readdir(dirPath)).filter(f => f.endsWith('.json'))
					for (const file of files) {
						const stat = await fs.stat(path.join(dirPath, file))
						totalSize += stat.size
					}
				}
			} catch { }
		}
		return totalSize
	}

	private getLanguageCodeFromLocale(locale: string): string {
		if (LOCALE_MAP[locale]) {
			return LOCALE_MAP[locale]
		}
		const normalized = this.normalizeLanguageCode(locale)
		if (this.translations[normalized]) {
			return normalized
		}
		const baseLocale = locale.split('-')[0],
			baseNormalized = this.normalizeLanguageCode(baseLocale)
		if (this.translations[baseNormalized]) {
			return baseNormalized
		}
		return DEFAULT_LANGUAGE
	}

	private getTranslation(languageCode: string, key: string): string | undefined {
		const translation = this.translations[languageCode]
		return translation?.[1]?.[`.${key}`]
	}

	private getDomainSpecificTranslation(languageCode: string, domain: TranslationDomain, key: string): string | undefined {
		const domainKey = `${domain}.${key}`
		return this.getTranslation(languageCode, domainKey)
	}

	private syncLoadFile(language: string, type: TranslationDomain): any {
		try {
			const filePath = path.join(this.translationDir, language, `${type}.json`)
			return JSON.parse(require('fs').readFileSync(filePath, 'utf-8'))
		} catch {
			return null
		}
	}

	public translate(domain: TranslationDomain, locale: string, key: Keys, data: Record<string, string> = {}): string {
		const languageCode = this.getLanguageCodeFromLocale(locale)
		let result = this.getDomainSpecificTranslation(languageCode, domain, key)
		if (!result) {
			result = this.getTranslation(languageCode, key)
		}
		if (!result && languageCode !== DEFAULT_LANGUAGE) {
			result = this.getDomainSpecificTranslation(DEFAULT_LANGUAGE, domain, key)
		}
		if (!result && languageCode !== DEFAULT_LANGUAGE) {
			result = this.getTranslation(DEFAULT_LANGUAGE, key)
		}
		if (!result) {
			const content = this.syncLoadFile(languageCode, domain)
			if (content) {
				const flattened = this.flattenObject(content)
				result = flattened[`.${key}`] || flattened[`.${domain}.${key}`]
			}
		}
		if (!result) {
			throw new Error(`Translation not found: ${domain}.${key} for locale ${locale}`)
		}
		return result.replace(/\{(\w+)\}/g, (_, k) => data[k] ?? '')
	}

	public use(language: string, key: Keys, data: Record<string, string> = {}): string {
		return this.translate('website', language, key, data)
	}

	public item(language: string, key: string, count: number, full: boolean = false): string {
		const pluralKey = `general.items.${key}.plural`,
			singleKey = `general.items.${key}.single`
		try {
			const plural = this.use(language, pluralKey),
				single = this.use(language, singleKey),
				word = count === 1 ? single : plural
			return full ? `${count} ${word}` : word
		} catch {
			return count === 1 ? key : `${key}s`
		}
	}

	public getAvailableLanguages(): LanguageInfo[] {
		const baseCount = this.knownLanguages[DEFAULT_LANGUAGE]?.count ?? 1
		return Object.values(this.knownLanguages).map(lang => ({
			name: lang.name,
			code: lang.code,
			flag: lang.flag || '',
			progress: Math.round((lang.count / baseCount) * 10000) / 100
		}))
	}

	public createLocaleMappings(domain: TranslationDomain, key: Keys): DiscordLocaleMapping & (() => Record<string, string | undefined>) {
		const mappings: Record<string, string | undefined> = {}
		for (const locale of Object.keys(LOCALE_MAP)) {
			try {
				mappings[locale] = this.translate(domain, locale, key)
			} catch {
				mappings[locale] = undefined
			}
		}
		const baseTranslation = this.translate(domain, 'en-US', key)
		const mappingFunc = (() => mappings) as DiscordLocaleMapping & (() => Record<string, string | undefined>)
		Object.assign(mappingFunc, mappings)
		mappingFunc.base = baseTranslation
		return mappingFunc
	}
}

const translation = new Translation()

translation.initialize().catch(() => { })

export const size = translation.getTranslationSize()

export function use(language: string, key: Keys, data: Record<string, string> = {}): string {
	return translation.use(language, key, data)
}

export function item(language: string, key: string, count: number, full: boolean = false): string {
	return translation.item(language, key, count, full)
}

export function languages(): LanguageInfo[] {
	return translation.getAvailableLanguages()
}

export function translate(domain: TranslationDomain, locale: string, key: Keys, data: Record<string, string> = {}): string {
	return translation.translate(domain, locale, key, data)
}

export function discord(key: Keys): DiscordLocaleMapping & (() => Record<string, string | undefined>) {
	return translation.createLocaleMappings('discord', key)
}

export function api(key: Keys): DiscordLocaleMapping & (() => Record<string, string | undefined>) {
	return translation.createLocaleMappings('api', key)
}

export function website(key: Keys): DiscordLocaleMapping & (() => Record<string, string | undefined>) {
	return translation.createLocaleMappings('website', key)
}

export type { Translation, LanguageInfo }