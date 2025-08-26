import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, APIActionRowComponent } from "discord.js"
import { Scope } from "@sentry/node"

import { client } from "@/discord"
import getVersion from "@/index"

import env from "@/globals/env"
import logger from "@/globals/logger"
import db from "@/globals/database"
import cache from "@/globals/cache"

import { PaginateType } from "@/discord/globals/classes/button"

import CustomEmbed from "@/discord/globals/classes/customEmbed"

type PromiseOrNot<T> = T | Promise<T>

const version = getVersion()

export default class Context<Interaction extends any> {
	protected startTime!: number

	constructor(interaction: Interaction, scope: Scope) {
		this.interaction = interaction
		this.scope = scope
	}

	public join(...strings: (string | number | undefined | null | boolean)[]): string {
		return strings.filter((str) => str === '' || Boolean(str)).join('\n')
	}

	public Embed() {
		return new CustomEmbed(performance.now() - this.startTime)
	}

	public async paginate<Data extends any[]>(page: number, direction: PaginateType, count: PromiseOrNot<number>, data: (meta: { take: number, skip: number }) => PromiseOrNot<Data>, itemsPerPage = 10): Promise<[page: number, count: number, data: Data]> {
		if (page < 2 && direction === 'back') page = 1
		page = direction === 'first'
			? 1
			: direction === 'back'
				? page - 1
				: direction === 'next'
					? page + 1
					: page
		const c = await Promise.resolve(count)
		if (direction === 'last') page = Math.ceil((c || 1) / itemsPerPage)
		else page = page > Math.ceil((c || 1) / itemsPerPage) ? Math.ceil((c || 1) / itemsPerPage) : page
		return [page, c, await Promise.resolve(data({ take: itemsPerPage, skip: (page - 1) * itemsPerPage }))]
	}

	public paginateButtons(page: number, count: number, button: (type: PaginateType) => string, itemsPerPage = 10): [APIActionRowComponent<any>, APIActionRowComponent<any>] {
		return [
			new ActionRowBuilder()
				.setComponents(
					new ButtonBuilder()
						.setEmoji('1150889388834820249')
						.setStyle(ButtonStyle.Primary)
						.setCustomId(button('refresh')),
					new ButtonBuilder()
						.setEmoji('1150889245603528764')
						.setDisabled(page === 1)
						.setStyle(ButtonStyle.Primary)
						.setCustomId(button('back')),
					new ButtonBuilder()
						.setLabel(page.toString())
						.setDisabled(true)
						.setStyle(ButtonStyle.Secondary)
						.setCustomId('e'),
					new ButtonBuilder()
						.setEmoji('1150889195057991732')
						.setDisabled(page >= Math.ceil(count / itemsPerPage))
						.setStyle(ButtonStyle.Primary)
						.setCustomId(button('next'))
				),
			new ActionRowBuilder()
				.setComponents(
					new ButtonBuilder()
						.setEmoji('1150889245603528764')
						.setLabel('First Page')
						.setStyle(ButtonStyle.Primary)
						.setDisabled(page === 1)
						.setCustomId(button('first')),
					new ButtonBuilder()
						.setEmoji('1150889195057991732')
						.setLabel('Last Page')
						.setStyle(ButtonStyle.Primary)
						.setDisabled(page >= Math.ceil(count / itemsPerPage))
						.setCustomId(button('last'))
				)
		] as any
	}

	public interaction: Interaction
	public client = client as Client<true>
	public cache = cache
	public env = env
	public database = db
	public logger = logger
	public scope: Scope
	public appVersion = version
}