
const dotenv = require('dotenv');
dotenv.config();

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,],
    partials: [Partials.User, Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.Emoji, Partials.Presence, Partials.Guild], });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

  if ('data' in command && 'execute' in command) {
    console.log(`[INFO] Loaded command ${command.data.name} from ${filePath}.`)
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.MessageCreate, async interaction => {
  if (!interaction.content.startsWith(process.env.PREFIX) || interaction.author.bot) return;
    console.log(`[INFO] Executing command ${interaction.content} from ${interaction.author.tag}.`)
    var command = interaction.client.commands.get((interaction.content).substring(1));
		const args = interaction.content.slice(process.env.PREFIX).trim().split(/ +/g);
    
    if (args.length > 1) {
      command = interaction.client.commands.get(args[0].substring(1));
      args.shift;

    }
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
  
    try {
      await command.execute(interaction);
      console.log("Command executed successfully.")
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
    
  });

client.login(process.env.DISCORD_TOKEN);