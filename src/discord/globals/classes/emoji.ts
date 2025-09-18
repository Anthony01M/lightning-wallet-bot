import fs from "fs/promises"
import path from "path"

import logger from "@/globals/logger"
import cache from "@/globals/cache"

import { getAllCustomEmoji, getCustomEmoji } from "@/discord/globals/classes/emoji/custom"
import { getFallbackEmoji } from "@/discord/globals/classes/emoji/fallback"
import { canUseCustomEmojis } from "@/discord/globals/classes/permission"
import { formatCustomEmoji } from "@/discord/globals/classes/emoji/base"

import type { Client, Guild } from "discord.js"

function isImageFile(name: string) {
	return /\.webp$/i.test(name)
}

async function readLocalFiles(dir: string): Promise<string[]> {
	const out: string[] = [],
		entries = await fs.readdir(dir, { withFileTypes: true })
	for (const e of entries) {
		const p = path.join(dir, e.name)
		if (e.isDirectory()) {
			out.push(...await readLocalFiles(p))
		} else if (e.isFile() && isImageFile(e.name)) {
			out.push(p)
		}
	}
	return out
}

class Emojis {
	private localDir = path.join(process.cwd(), 'storage', 'emojis')

	async listLocal(): Promise<{ name: string, file: string }[]> {
		try {
			const files = await readLocalFiles(this.localDir)
			return files.map(f => {
				const name = path.basename(f, path.extname(f))
				return { name, file: f }
			})
		} catch (err) {
			return []
		}
	}

	async fetchRemote(client: Client): Promise<any[]> {
		return await getAllCustomEmoji(client)
	}

	async uploadMissing(client: Client): Promise<{ uploaded: string[], skipped: string[] }> {
		const local = await this.listLocal(),
			remote = await this.fetchRemote(client),
			remoteNames = new Set(remote.map(e => e.name)),
			uploaded: string[] = [],
			skipped: string[] = []
		for (const item of local) {
			if (remoteNames.has(item.name)) {
				skipped.push(item.name)
				continue
			}
			try {
				const data = await fs.readFile(item.file)
				const app = client.application
				if (!app) {
					skipped.push(item.name)
					continue
				}
				const created = await app.emojis.create({ name: item.name, attachment: data } as any)
				uploaded.push(created.name ?? created.id)
			} catch (err: any) {
				logger()
					.text('Emoji upload failed')
					.text('\n')
					.text(err.stack ?? err.message ?? String(err), c => c.red)
					.error()
				continue
			}
		}
		try {
			await cache.use('emojis:map', async () => {
				const arr = await this.fetchRemote(client)
				const out: Record<string, { id: string, animated: boolean, name: string }> = {}
				for (const e of arr) out[e.name ?? e.id] = { id: e.id, animated: !!e.animated, name: e.name ?? '' }
				return out
			}, 5 * 60 * 1000)
		} catch { }
		return { uploaded, skipped }
	}

	async deleteExtras(client: Client): Promise<{ deleted: string[] }> {
		const local = await this.listLocal(),
			localNames = new Set(local.map(l => l.name)),
			remote = await this.fetchRemote(client),
			deleted: string[] = []
		for (const em of remote) {
			if (!localNames.has(em.name ?? '')) {
				try {
					await em.delete()
					deleted.push(em.name ?? '')
				} catch (err) {
					logger()
						.text('Emoji delete failed')
						.text('\n')
						.text(String(err), c => c.red)
						.error()
				}
			}
		}
		try {
			await cache.use('emojis:map', async () => {
				const arr = await this.fetchRemote(client)
				const out: Record<string, { id: string, animated: boolean, name: string }> = {}
				for (const e of arr) out[e.name ?? e.id] = { id: e.id, animated: !!e.animated, name: e.name ?? '' }
				return out
			}, 5 * 60 * 1000)
		} catch { }
		return { deleted }
	}

	async syncApplication(client: Client, opts: { deleteRemote?: boolean } = {}): Promise<{ uploaded: string[], skipped: string[], deleted: string[] }> {
		const up = await this.uploadMissing(client)
		let del: string[] = []
		if (opts.deleteRemote) {
			const d = await this.deleteExtras(client)
			del = d.deleted
		}
		return { uploaded: up.uploaded, skipped: up.skipped, deleted: del }
	}

	async get(name: string, client: Client): Promise<{ id: string, name: string, animated: boolean } | null> {
		return await getCustomEmoji(name, client)
	}

	async formatted(name: string, client: Client, guild?: Guild): Promise<string | null> {
		if (guild && !canUseCustomEmojis(guild)) {
			return getFallbackEmoji(name) ?? null
		}
		const e = await this.get(name, client)
		if (e) return formatCustomEmoji(e)
		return getFallbackEmoji(name) ?? null
	}
}

export default new Emojis()