const { SlashCommandBuilder } = require('discord.js');
const userController  = require('../controllers/userController');
const { User } = require('../models/User');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('account')
		.setDescription('Response the user info'),
	async execute(interaction) {
			await interaction.channel.send(userController.getOneUser(interaction.author.id));
	},
};