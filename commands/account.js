const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const userController  = require('../controllers/userController');
const { User } = require('../models/User');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('account')
		.setDescription('Response the user info'),
	async execute(interaction) {
		let user = userController.getOneUser(interaction.author.id);
		if(user) {
			if(!user.city) {
				interaction.reply("You didn't provide your coords yet, check `!account-commands` \n or if you don't have an account (check it with `!account`) register with `!start-register` 😊")
			} else {
				const exampleEmbed = new EmbedBuilder()
				.setTitle(user.username)
				.setColor(interaction.member.displayHexColor)
				.setDescription("**City**: " + user.city + "\n **Full Name**: " + user.fullName + "\n **Id: **" + user.id.slice(0, -8) + "XXXXXXXX" )
				.setImage(interaction.author.avatarURL())
			interaction.channel.send({ embeds: [exampleEmbed] });
			}
		}	else {
			interaction.reply("You don't have an account, check `!account-commands` \n and follow `!start-register` 😊")
		}
	},
};