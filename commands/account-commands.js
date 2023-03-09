const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('account-commands')
		.setDescription('Info / instructions of glovo bots'),
	async execute(interaction) {
		return interaction.reply(`:information_source: Hi, Hey ${interaction.author} These are the account commands available. :information_source: \n `
        + " You can use the following commands to get started: \n"
        + "     \`!account-commands\` - to list all account commands\n"
        + "     \`!start-register\` - Begin your registration\n"
        + "     \`!account\` - Lists your info\n"
        + "     \`!delete-account\` - Delete your account if exists\n"
        + "     \`!add-coords\` - Add latitude and longitude, remember to add the arguments!\n"


        );
	},
};