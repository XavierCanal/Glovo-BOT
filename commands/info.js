const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Info / instructions of glovo bots'),
	async execute(interaction) {
		return interaction.reply(":information_source: Hi, I'm **Glovo Bot!** I'm here to help you with your orders on Glovo. :information_source: \n"
        + " You can use the following commands to get started: \n"
        + "     \`!account-commands\` - to list all account commands\n"
        + "     \`!order\` - to place an order\n"
        + "     \`!cancel\` - to cancel an order\n"
        + "     \`!status\` - to check the status of your order\n"
        + "     \`!help\` - to get help with the commands\n"
        + "     \`!info\` - to get info about me\n"


        );
	},
};