import { InteractionContextType, ApplicationCommandType } from "discord.js"

import BaseBuilder from "@/bot/globals/classes/command/context/base"

export default class Builder<Excluded extends (keyof BaseBuilder)[] = []> extends BaseBuilder<Excluded> {
	constructor() {
		super([InteractionContextType.Guild], [0], ApplicationCommandType.Message)
	}
}