import type { Client } from "discord.js"

import cache from "@/globals/cache"

export async function getAllCustomEmoji(client: Client): Promise<any[]> {
	const app = client.application
	if (!app) return []
	const fetched = await app.emojis.fetch()
	return Array.from(fetched.values())
}

export async function getCustomEmoji(name: string, client: Client): Promise<{ id: string, name: string, animated: boolean } | null> {
	const map = await cache.use("emojis:map", async () => {
		const arr = await getAllCustomEmoji(client),
			out: Record<string, { id: string, animated: boolean, name: string }> = {}
		for (const e of arr) out[e.name ?? e.id] = { id: e.id, animated: !!e.animated, name: e.name ?? "" }
		return out
	}, 5 * 60 * 1000)
	const e = (map as any)[name]
	if (!e) return null
	return { id: e.id, name: e.name, animated: !!e.animated }
}