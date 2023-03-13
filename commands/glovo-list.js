const { SlashCommandBuilder } = require('discord.js');
const userController  = require('../controllers/userController');
const { User } = require('../models/User');
const axios = require('axios');
const googleService = require('../services/googleMapService');


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
            let city = await googleService.getCityName(user.lat, user.long)
            if(city) {
                
                //interaction.reply(`[INFO] Your city is ${city}`)
            }
        }
        },
};