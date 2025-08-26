import StringMenu from "@/discord/globals/classes/menu/string"

export default new StringMenu()
	.setName('example-string-menu')
	.listen(async (ctx) => {
		await ctx.interaction.deferReply({ ephemeral: true })
		ctx.interaction.editReply(`Selected: ${ctx.interaction.values[0]}`)
	})
	.export()