const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Info / instructions of glovo bots'),
    async execute(interaction) {
        try {
            return interaction.reply(":information_source: Hi, I'm **Glovo Bot!** I'm here to help you with your orders on Glovo. :information_source: \n"
                + " You can use the following commands to get started: \n"
                + "     \`!account-commands\` - to list all account commands\n"
                + "     \`!glovo\` - to list the available Glovo commands \n"
                + "     \`!info\` - to get info about me\n\n"
                + "     https://2daw.gitbook.io/2daw-xcanal/discord-bot/discord-glovo-bot\n"
            );
        } catch (error) {
            console.log(error)
        }

    },
};