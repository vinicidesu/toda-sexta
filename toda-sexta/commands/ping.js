const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('FODA-SE'),

    async execute(interaction) {
        await interaction.reply('fodase')
    }
}