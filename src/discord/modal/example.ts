import Modal from "@/discord/globals/classes/modal"

export default new Modal()
	.setName('example')
	.setTitle('Example Modal')
	.build(async (builder) => {
		/*
		const test = "hi"

		return builder
			.addRow(/* Row data *//*)
	*/
	})
	.listen(async (ctx) => {
		if (!ctx.interaction.guild) return
		return ctx.interaction.reply({
			ephemeral: true,
			content: 'Hello World!'
		})
	})
	.export()