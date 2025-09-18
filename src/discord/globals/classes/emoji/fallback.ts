const FALLBACK: Record<string, string> = {
	refresh: '🔄',
	back: '◀️',
	next: '▶️',
	first_page: '⏮️',
	last_page: '⏭️',
}

export function getFallbackEmoji(name: string): string | null {
	return FALLBACK[name] ?? null
}