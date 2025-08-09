import RoleMenu from "@/bot/globals/classes/menu/role"

export default new RoleMenu()
	.setName('example-role-menu')
	.listen(async (ctx) => {
		ctx.interaction.reply(`Selected: ${ctx.interaction.values[0]}`)
	})
	.export()