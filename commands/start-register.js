const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start-register')
		.setDescription('Send private instructions'),
	async execute(interaction) {
		//const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		await interaction.reply(`Hey ${interaction.author}, check your DMs!.`);
        await interaction.author.send("Follow this instructions in order to get registred in our system \n"+
        "1. Create your account so we can save your info\n"+
		"2. Fill this command and send it to me!\n"+
        "   `!register-me fullName`\n"+
		"3. Navigate to https://www.latlong.net/ and discover your coords\n"+
        "4. Add your coords to your profile, using the next command\n" +
		"	`!addLatLong latitude lognitude`\n" +
		"6. Example: !addLatLong 42.180687 2.484616\n\n" +
		"This is all for now, you can check your user info with `!user-data`"
		)
        
	},
};