const {SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const userController = require('../controllers/userController');
const glovo = require('../glovo-api/getMenu');
const locationHelper = require('../services/locationHelper');
const {PageEmbedBuilder, PageUpdater} = require('discord-embedbuilder');

let embeds = new Array();
let foodType = new Map();
module.exports = {
    data: new SlashCommandBuilder()
        .setName('glovo-menu')
        .setDescription('This command shows you the menu of the selected a restaurant.'),
    async execute(interaction) {
        interaction = interaction;
        const args = interaction.content.slice(process.env.PREFIX).trim().split(/ +/g);
        args.shift();
        let id;
        let addressID;
        if (!args.length) {
            await interaction.channel.send(`You didn't provide any arguments, ${interaction.author}! \n We need the restaurant id, use ` + "`!glovo-restaurants`" + ` to get the list of restaurants`);
        } else {
            id = args[0];
            addressID = args[1];
            let user = userController.getOneUser(interaction.author.id);
            if (user) {
                if (!user.city) {
                    interaction.reply("[ERROR] You haven't set your city yet. \n Please use `!account-commands` and follow the `!add-cords` commnad.")
                } else {
                    let IATA = locationHelper.getCityIATAByName(user.city.toLowerCase());
                    if (IATA == "[ERROR] Can't find an IATA code for this city.") {
                        interaction.reply("[ERROR] Can't find an IATA code for this city. \n Please use `!account-commands` and follow the `!add-cords` commnad.")
                    } else {

                        await glovo.getMenu(id, addressID, user, IATA, async (err, data) => {
                            let resume;
                            if (err) {
                                console.log('Error:', err.message);
                                interaction.reply("[ERROR] There was an error while listing the restaurants. Please try again later.. 😔")
                            } else {
                                resume = "This restaurant has the following food types: \n\n";
                                data.data.body.forEach(element => {
                                    if (element.data.title) {
                                        foodType.set(element.data.title.toLowerCase(), element.data.elements);
                                        resume += "**- " + element.data.title + " **\n";
                                    }
                                });
                                resume += "\nReply with the food type to see the list"

                                interaction.reply(resume);
                                showTypeFoodList(interaction);
                            }
                        });

                    }

                }
            }
        }

    },
};

function prepareEmbed(element) {
    let image;
    if (element.data.imageId) {
        image = process.env.IMAGEURL + element.data.imageId;
    } else {
        image = process.env.NOIMAGEURL;
    }
    return(new EmbedBuilder()
        .setTitle(element.data.name)
        .setColor("#FF0000")
        .setDescription("**Description**: " + element.data.description + "\n **Price**: " + element.data.priceInfo.displayText)
        .setImage(image));

}

function showTypeFoodList(interaction) {
    const msg_filter = (m) => m.author.id === interaction.author.id;
    interaction.channel.awaitMessages({ filter: msg_filter, max: 1 , time: 30000})
        .then(async (collected) => {
            if (foodType.has(collected.first().content.toLowerCase())) {
                interaction.reply(`Generating the list ${collected.first().content}...`);
                foodType.get(collected.first().content.toLowerCase()).forEach(element => {
                    embeds.push(prepareEmbed(element));
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

            }

            //TODO Actualment funciona correctament nomès la primera petició, s'ha de fer la crida a showTypeFoodList() recursivament fins que l'usuari cancel·li la petició o passi el temps
            // així pot llistar els diferents tipus de menjar que té el restaurant

            else
                interaction.reply('Operation canceled.');
                return;
        }).catch(() => {
        interaction.reply('No answer after 30 seconds, operation canceled.');
        return;
    });

}