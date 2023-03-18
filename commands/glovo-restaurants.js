const {SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const userController = require('../controllers/userController');
const glovo = require('../glovo-api/getRestaurants');
const locationHelper = require('../services/locationHelper');

const {
    PageEmbedBuilder, PageUpdater,
} = require('discord-embedbuilder');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = {
    data: new SlashCommandBuilder()
        .setName('glovo-restaurants')
        .setDescription('Response the user info'),
    async execute(interaction) {
        let user = userController.getOneUser(interaction.author.id);
        if (user) {
            if (!user.city) {
                interaction.reply("[ERROR] You haven't set your city yet. \n Please use `!account-commands` and follow the `!add-cords` commnad.")
            } else {
                console.log(user.city.toLowerCase())
                let IATA = locationHelper.getCityIATAByName(user.city.toLowerCase());
                if (IATA == "[ERROR] Can't find an IATA code for this city.") {
                    interaction.reply("[ERROR] Can't find an IATA code for this city. \n Please use `!account-commands` and follow the `!add-cords` commnad.")
                } else {
                    let embeds = new Array();
                    await glovo.getRestaurants(IATA,user, 0, async (err, data) => {
                        if (err) {
                            console.log('Error:', err.message);
                            interaction.reply("[ERROR] There was an error while listing the restaurants. Please try again later.. 😔")
                        } else {
                            data.elements.forEach(element => {
                                if (element.singleData.storeData) {
                                    embeds.push(prepareEmbed(element));
                                }
                            });

                            const builder = new PageEmbedBuilder(interaction.channel)
                                .setTime(120000);

                            await builder
                                .setEmbeds(embeds)
                                .defaultReactions(['back', 'next', 'stop'])
                                .build();

                            const pageUpdater = new PageUpdater(builder, interaction.author);
                            pageUpdater.awaitPageUpdate()
                                .on('cancel', (collector) => collector.stop())
                                .on('page', (page) => builder.updatePage(page));

                            const message = new EmbedBuilder()
                                .setColor("#FF0000")
                                .setDescription("Here are the restaurants available in your city. \n You can use the reactions to navigate through the pages. \n If you want to stop the list, just click on the stop button. 😊 +" +
                            "\n\n **Note**: If you want to see the menu of a restaurant, use the command:\n🍴 `!glovo-menu restaurantID restaurantAddressID` 🍴")

                            interaction.channel.send({ embeds: [message] })
                        }
                    });
                }
            }
        } else {
            interaction.reply("[ERROR] You don't have an account.\nPlease use `!account-commands` and follow the `!start-register` command. 😊")
        }

    },
};

function prepareEmbed(element) {
    let store = element.singleData.storeData.store;
    if (element.singleData.storeData.filters) {
        filters = "";
        element.singleData.storeData.filters.forEach(element => {
            filters += element.name + ", ";
        });
    } else {
        filters = "None";
    }
    return(new EmbedBuilder()
        .setTitle(store.name)
        .setColor("#FF0000")
        .setDescription("**Address**: " + store.address + "\n **Filters**: " + filters + "\n **Phone Number**: " + store.phoneNumber + "\n **ID**: " + store.id + " **AddressID**: " + store.addressId + "\n" +`!glovo-menu ${store.id}` + " " + `${store.addressId}`)
        .setImage(process.env.IMAGEURL + store.imageId))

}