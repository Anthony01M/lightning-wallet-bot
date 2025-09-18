import { PermissionFlagsBits } from "discord.js"
import type { Guild } from "discord.js"

export function canUseCustomEmojis(guild: Guild): boolean {
	try {
		const me = guild.members.me
		if (!me) return false
		const perms = me.permissions
		if (!perms) return false
		return perms.has(PermissionFlagsBits.SendMessages) && perms.has(PermissionFlagsBits.UseExternalEmojis)
	} catch {
		return false
	}
}