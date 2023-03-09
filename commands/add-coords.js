const { SlashCommandBuilder } = require('discord.js');
const userController  = require('../controllers/userController');
const { User } = require('../models/User');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-coords')
		.setDescription('Add latitude and longitude'),
	async execute(interaction) {
		const args = interaction.content.slice(process.env.PREFIX).trim().split(/ +/g);
		args.shift();
		if (!args.length) {
			await interaction.channel.send(`You didn't provide any arguments, ${interaction.author}!`);
		} else {
			var user = new User(interaction.author.username, interaction.author.id)
			await interaction.channel.send(userController.addCoords(user, args[0], args[1]));
		}
        
	},
};