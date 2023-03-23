const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('glovo')
        .setDescription('This command lists all commands that interact with glovo'),
    async execute(interaction) {
        try {
            await interaction.reply(`Hey ${interaction.author}, these are the commands to start using glovo-BOT.\n`
                + "In order to list restaurants \n" +
                "---> `!glovo-restaurants` \n" +
                "---> `!glovo-menu` <'restaurantId restaurantAddressID'> \n"
            );
        } catch (error) {
            console.log(error)
        }
    },
};