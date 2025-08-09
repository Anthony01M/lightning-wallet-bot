import MentionableMenu from "@/bot/globals/classes/menu/mentionable"

export default new MentionableMenu()
    .setName('example-mentionable-menu')
    .listen(async (ctx) => {
        ctx.interaction.reply(`Selected: ${ctx.interaction.values[0]}`)
    })
    .export()