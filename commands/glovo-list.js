const { SlashCommandBuilder } = require('discord.js');
const userController  = require('../controllers/userController');
const { User } = require('../models/User');
const axios = require('axios');
const locationHelper = require('../services/locationHelper');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('glovo-list')
		.setDescription('Response the user info'),
	async execute(interaction) {
        let user = await userController.getLatLong(interaction.author.id);
		if (!user.lat || ! user.long) {
            interaction.reply("[WARNING] You didn't provide your latitude and longitude, check `!account-commands` \n or if you don't have an account (check it with `!account`) register with `!start-register` 😊")
        } else { 
            interaction.reply(`[WARNING] Not implemented yet.`)
            await locationHelper(user.lat, user.long, (err, data) => {
                if (err) {
                  console.log('Error:', err.message);
                } else {
                  interaction.reply(`[SUCCESS] Your city is ${data.city}!`)
                }
              });
        }
        },
};