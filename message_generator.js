const labels = require('./labels.json')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports.createInputMessage =() => {
    let embed = new EmbedBuilder()
        .setTitle(labels.inputTitle)
        .setDescription(labels.inputContent)
    let row = new ActionRowBuilder()
        .addComponents(new ButtonBuilder().setCustomId('inputButton').setLabel(labels.inputButtonText).setStyle(ButtonStyle.Primary))

    return { embeds: [embed], components: [row]}
}

module.exports.createPromptMessage = () => {
    let embed = new EmbedBuilder()
        .setTitle(labels.promptTitle)
        .setDescription(labels.promptContent)

    return { embeds: [embed]}
}

module.exports.createConfirmMessage = () => {
    let embed = new EmbedBuilder()
        .setTitle(labels.confirmTitle)
        .setDescription(labels.confirmContent)
    return { embeds: [embed]}
}

module.exports.createSuggestionMessage = (message) => {
    let embed = new EmbedBuilder()
        .setTitle(labels.suggestionTitle)
        .setDescription(message)
    return { embeds: [embed]}
}