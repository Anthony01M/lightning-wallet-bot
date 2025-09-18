import type { GuildEmoji } from "discord.js"

export function formatCustomEmoji(e: { id: string, name: string, animated?: boolean }): string {
    if (!e || !e.id || !e.name) return ""
    return `${e.animated ? "<a" : "<:"}:${e.name}:${e.id}>`.replace(/<:|<a:/, (m) => m)
}

export function fromGuildEmoji(g: GuildEmoji) {
    return { id: g.id, name: g.name ?? "", animated: g.animated }
}