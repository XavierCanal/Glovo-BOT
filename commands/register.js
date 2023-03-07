const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Send private instructions'),
	async execute(interaction) {
		//const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		await interaction.reply(`Hey ${interaction.user.username}, check your DMs!.`);
        await interaction.user.send("Follow this instructions in order to get registred in our system \n"+
        "1. Create your account so we can save your info"+
		"2. Fill this command and send it to me!\n"+
        "   `!register-me fullName`"+
		"3. Navigate to https://www.latlong.net/ and discover your coords"+
        "4. Add your coords to your profile, using the next command" +
		"5. `!addLatLong latitude lognitude`" +
		"6. Example: !addLatLong 42.180687 2.484616"
		)
        
	},
};