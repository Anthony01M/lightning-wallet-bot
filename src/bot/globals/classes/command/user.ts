import { InteractionContextType } from "discord.js"

import BaseBuilder from "@/bot/globals/classes/command/base"

export default class Builder<Excluded extends (keyof BaseBuilder)[] = []> extends BaseBuilder<Excluded> {
	constructor() {
		super(
			[InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
			[1]
		)
	}
}