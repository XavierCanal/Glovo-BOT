const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start-register')
        .setDescription('This command starts the registration process, it will send you a DM with the instructions'),
    async execute(interaction) {
        try {
            await interaction.reply(`Hey ${interaction.author}, check your DMs!.`);
            await interaction.author.send("Follow this instructions in order to get registred in our system \n" +
                "1. Create your account so we can save your info: \n" +
                "    - Fill this command and send it to me!\n" +
                "       --> `!register-me fullName`\n" +
                "3. Navigate to https://www.latlong.net/ and discover your coords\n" +
                "4. Add your coords to your profile, using the next command\n" +
                "	--> `!add-coords latitude lognitude`\n" +
                "6. Example: !add-coords 42.180687 2.484616\n\n" +
                "This is all for now, you can check your user info with `!user-data`"
            )
        } catch (error) {
            console.log(error)
        }

    },
};