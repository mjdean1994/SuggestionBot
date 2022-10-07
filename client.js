const { Client, GatewayIntentBits, Partials } = require('discord.js');

module.exports = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessageReactions], partials: [Partials.Channel] });