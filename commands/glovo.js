const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('glovo')
		.setDescription('Give glovo instructions'),
	async execute(interaction) {
		await interaction.reply(`Hey ${interaction.author}, these are the commands to start using glovo-BOT.\n`
		+		"In order to list restaurants \n"+
        		"---> `!glovo-restaurants` \n"+
				"---> `!glovo-menu` <'restaurantId restaurantAddressID'> \n"

		);
	},
};