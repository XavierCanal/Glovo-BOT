const {SlashCommandBuilder} = require('discord.js');
const userController = require('../controllers/userController');
const {User} = require('../models/User');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('register-me')
        .setDescription('This command registers a user in the database'),
    async execute(interaction) {
        try {
            const args = interaction.content.slice(process.env.PREFIX).trim().split(/ +/g);
            args.shift();
            if (!args.length) {
                await interaction.channel.send(`You didn't provide any arguments, ${interaction.author}!`);
            } else {
                var user = new User(interaction.author.username, interaction.author.id, args[0])
                await interaction.channel.send(userController.createNewUser(user));
            }
        } catch (error) {
            console.log(error)
        }
    },
};