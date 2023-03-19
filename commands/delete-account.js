const { SlashCommandBuilder } = require('discord.js');
const userController  = require('../controllers/userController');
const { User } = require('../models/User');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete-account')
		.setDescription('This command deletes your account from the database, this command requires confirmation.'),
	async execute(interaction) {
        interaction.reply('Are you sure, your account will be permanently deleted.\n'
        + 'Confirm with `yes` or deny with `no`.');
        const msg_filter = (m) => m.author.id === interaction.author.id;
            interaction.channel.awaitMessages({ filter: msg_filter, max: 1 , time: 10000})
            .then(async (collected) => {
                        if (collected.first().content.toLowerCase() == 'yes') {
                                interaction.reply('Deleting account...');
                                response = await interaction.channel.send(userController.deleteOneUser(interaction.author.id));
                                interaction.reply(response);
                        }

                        else
                                interaction.reply('Operation canceled.');    
            }).catch(() => {
                message.reply('No answer after 30 seconds, operation canceled.');
        });
    },
};