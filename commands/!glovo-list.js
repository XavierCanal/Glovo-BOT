const { SlashCommandBuilder, Embed } = require('discord.js');
const userController  = require('../controllers/userController');
const glovo = require('../glovo-api/getRestaurants');
const locationHelper = require('../services/locationHelper');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('glovo-list')
		.setDescription('Response the user info'),
	async execute(interaction) {
        let user = userController.getOneUser(interaction.author.id);
        if(user) {
            if (!user.city) {
                interaction.reply("[ERROR] You haven't set your city yet. \n Please use `!account-commands` and follow the `!add-cords` commnad.")
            } else {
                console.log(user.city.toLowerCase())
                let IATA = locationHelper.getCityIATAByName(user.city.toLowerCase());
                if (IATA == "[ERROR] Can't find an IATA code for this city.") { 
                    interaction.reply("[ERROR] Can't find an IATA code for this city. \n Please use `!account-commands` and follow the `!add-cords` commnad.")
                } else {
                await glovo.getRestaurantsByIATA(IATA,0, (err, data) => {
                    var embeded = new Array();
                    if (err) {
                      console.log('Error:', err.message);
                      interaction.reply("[ERROR] There was an error while listing the restaurants. Please try again later.. 😔")
                    } else {
                    console.log(data)
                      data.elements.forEach(element => {
                        if(element.storeData.store.filters) {
                            filters = "";
                            element.storeData.store.filter.forEach(element => {
                                filters += element.name + ", ";
                            });
                        } else {
                            filters = "None";
                        }
                        embeded.push(new EmbedBuilder()
                            .setTitle(element.storeData.store.name)
                            .setColor(interaction.member.displayHexColor)
                            .setDescription("**Address**: " + element.storeData.store.adress + "\n **filters**: " + filters)
                            .setImage(process.env.IMAGEURL + element.storeData.store.imageId))
                      });
                      interaction.channel.send({ embeds: [embeded] });
                    }
                  });
            }
        }
        } else {
            interaction.reply("[ERROR] You don't have an account.\nPlease use `!account-commands` and follow the `!start-register` command. 😊")
        }

        },
};