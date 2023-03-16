const { SlashCommandBuilder } = require('discord.js');
const userController  = require('../controllers/userController');
const { User } = require('../models/User');
const locationHelper = require('../services/locationHelper');


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
			interaction.channel.send(`Searching your city...`)
			await locationHelper(user.lat, user.long, (err, data) => {
                if (err) {
                  console.log('Error:', err.message);
				  interaction.reply("[ERROR] There was an error while searching your city. Please try again later, using the command `!update-city \n We use a public API, so it could be down. Or we exceded the maximum requests per day😔")
                } else {
                  interaction.reply(`[SUCCESS] Your city is ${data.city}! \n saving it...`)
                }
              });
			// now we have to save the city in the user


		}
        
	},
};