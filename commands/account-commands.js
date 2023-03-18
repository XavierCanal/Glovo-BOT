const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('account-commands')
		.setDescription('Info / instructions of glovo bots'),
	async execute(interaction) {
		return interaction.reply(`:information_source: Hey ${interaction.author} These are the account commands available. :information_source: \n `
        + " You can use the following commands to get started: \n"
        + "     \`!account-commands\` - to list all account commands\n"
        + "     \`!start-register\` - Begin your registration\n"
        + "     \`!account\` - Lists your info\n"
        + "     \`!delete-account\` - Delete your account if exists\n"
        + "     \`!add-coords lat long\` - Add latitude and longitude, remember to change lat and long for valid coords!\n"
		+ "     \`!update-city \` - This command needs the previous one! It searches your city from your coords, and we save it 😊 \n"
        );
	},
};