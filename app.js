const { token } = require('./config.json')
const client = require("./client")
const config_manager = require('./config.js')
const users = require('./users.js')
const message_generator = require('./message_generator.js')
const { ChannelType } = require('discord.js')

let sendToOuput = (message) => {
    let currentConfig = require('./config.json')
    let channel = client.channels.cache.get(currentConfig.outputChannelId)
    channel.send(message_generator.createSuggestionMessage(message))
}

let handleServerMention = (message) => {
    let command = message.content.split(" ")[1]
    if (command == "input") {
        config_manager.setInputChannel(message.channel, (err) => {
            if (err) {
                message.channel.send(`\`${err}\``)
            } else {
                message.channel.send(message_generator.createInputMessage())
            }  
        })
    } else if (command == "output") {
        config_manager.setOutputChannel(message.channel, (err) => {
            if (err) {
                message.channel.send(`\`${err}\``)
            } else {
                message.channel.send("Alright, this is where I'll post incoming suggestions from now on.")
            }
        })
    }

    try {
        message.delete()
    } catch (ex) {
        console.log("Failed to clean up message.")
    }
}

let handleDirectMessage = (message) => {
    users.setLastMessage(message.author.id, message.content, (err) => {
        if (err) {
            message.author.send(`\`${err}\``)
        } else {
            message.author.send(message_generator.createConfirmMessage())
            sendToOuput(message.content)
        }
    })
}

client.once('ready', () => {
    console.log("SuggestionBot has started.")
})

client.on('messageCreate', (message) => {
    if(message.author.id == client.user.id) return;
    if (message.mentions.has(client.user) && message.channel.type != ChannelType.DM) handleServerMention(message);
    if (message.channel.type == ChannelType.DM) handleDirectMessage(message);
});

client.on("interactionCreate", (interaction) => {
    if (!interaction.isButton()) return;

    if(interaction.customId == "inputButton") {
        interaction.user.send(message_generator.createPromptMessage())
    }

    interaction.deferUpdate()
});

client.login(token);