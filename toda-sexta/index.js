const fs = require('node:fs');
const path = require('node:path');

const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandsFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command);
    }
    else{
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

client.once(Events.ClientReady, c => {
    console.log('to testando foda-se');
})
client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) 
        return;
    
    const command = interaction.client.command.get(interaction.commandName);

    if(!command){
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try{
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true
        });
    }
    console.log(interaction);
});

