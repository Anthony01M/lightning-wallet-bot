import ChannelMenu from "@/bot/globals/classes/menu/channel"

export default new ChannelMenu()
	.setName('example-channel-menu')
	.listen(async (ctx) => {
		ctx.interaction.reply({
			content: `Selected: ${ctx.interaction.values[0]}`,
			components: [],
		})
	})
	.export()