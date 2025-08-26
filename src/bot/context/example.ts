import Builder from "@/bot/globals/classes/command/context/message/global"

export default new Builder()
	.build((builder) => builder
		.setName("example")
	)
	.listen(async (ctx) => {
		// Handle the interaction context
	})