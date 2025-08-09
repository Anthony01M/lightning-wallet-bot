import fs from "fs/promises"
import path from "path"

import logger from "@/globals/logger"

export abstract class Storage<T = any> {
	private readonly filePath: string
	private cache: T | null = null
	constructor(filename: string) {
		this.filePath = path.join(process.cwd(), 'storage', filename)
	}
	async load(): Promise<T> {
		if (this.cache) {
			return this.cache
		}
		try {
			const data = await fs.readFile(this.filePath, 'utf8')
			this.cache = JSON.parse(data)
			return this.cache as T
		} catch (error: any) {
			logger()
				.text(`Storage file not found: ${this.filePath}`)
				.error()
			throw new Error(`Failed to load storage: ${error.message}`)
		}
	}
	async reload(): Promise<T> {
		this.cache = null
		return this.load()
	}
	protected async save(data: T): Promise<void> {
		try {
			await fs.writeFile(this.filePath, JSON.stringify(data, null, 2))
			this.cache = data
		} catch (error: any) {
			logger()
				.text(`Failed to save storage: ${error.message}`)
				.error()
			throw error
		}
	}
}