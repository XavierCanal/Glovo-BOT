const { SlashCommandBuilder } = require('discord.js');
const userController  = require('../controllers/userController');
const { User } = require('../models/User');
const axios = require('axios');
const locationHelper = require('../services/locationHelper');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('update-city')
		.setDescription('This command updates your city, from your latitude and longitude.'),
	async execute(interaction) {
        let user = await userController.getLatLong(interaction.author.id);
		if (!user.lat || ! user.long) {
            interaction.reply("[WARNING] You didn't provide your latitude and longitude, check `!account-commands` \n or if you don't have an account (check it with `!account`) register with `!start-register` 😊")
        } else {
            await locationHelper(user.lat, user.long, (err, data) => {
                if (err) {
                  console.log('Error:', err.message);
                  interaction.reply("[ERROR] There was an error while searching your city. Please try again later.. \n We use a public API, so it could be down. Or we exceded the maximum requests per day 😔")
                } else {
                  interaction.reply(`[SUCCESS] Your city is ${data.city}! \n saving it...`)
				          interaction.reply(userController.updateCity(user, data.city));
                }
              });
        }
        },
};