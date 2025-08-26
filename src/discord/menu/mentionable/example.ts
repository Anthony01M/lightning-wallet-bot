import MentionableMenu from "@/discord/globals/classes/menu/mentionable"

export default new MentionableMenu()
    .setName('example-mentionable-menu')
    .listen(async (ctx) => {
        ctx.interaction.reply(`Selected: ${ctx.interaction.values[0]}`)
    })
    .export()