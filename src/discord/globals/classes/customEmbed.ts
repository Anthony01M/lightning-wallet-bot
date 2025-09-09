import { EmbedBuilder, EmbedFooterOptions } from "discord.js"

import getVersion from "@/index"

const version = getVersion()

export default class CustomEmbed extends EmbedBuilder {
	constructor(private timeMs: number) {
		super()
		this.data.footer = { text: `⏰ ${(this.timeMs).toFixed(1)}ms ~ ${version}`.trimEnd() }
	}

	override setFooter(options: EmbedFooterOptions | null): this {
		this.data.footer = { text: `⏰ ${(this.timeMs).toFixed(1)}ms ~ ${version} | ${options?.text}`, icon_url: options?.iconURL }
		return this
	}
}