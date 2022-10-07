# Suggestion Bot
This is a simple bot that allows server administrators to set up an anonymous feedback system wholly within Discord. It's designed to be lightweight and minimal, and all text is entirely configurable.

Note that this bot is currently designed to support only a single Discord server. Attempting to use it across multiple servers will result in configuration overrides and the experience will not work as expected.

## Running the Bot
1. Create files called `config.json` and `users.json`.
2. Initialize both files to empty JSON objects: `{}`
3. In `config.json`, add an attribute called `token` and set it to whatever your Bot token is.
4. Do a good ol' `npm install`.
5. Run the bot with `node app.py`

## Adding the Bot to the Server
You can use a link like this to add the bot to whatever server you want. Obviously, replace `APPLICATION_ID` with whatever your Discord application's ID is.
```https://discord.com/api/oauth2/authorize?client_id=APPLICATION_ID&permissions=2048&scope=bot```

## Bot Setup
Setting up the bot in a Discord server is super simple. Firstly, you'll need two channels--one where the suggestion prompt is posted and one where incoming suggestions are posted. I recommend making the suggestion prompt channel a read-only channel and making the incoming suggestions channel somewhere that only administrators can see. If this is the case, you'll want to make sure SuggestionBot is able to read and post in those channels.

To declare a channel as the suggestion prompt channel, simply send a message in that channel as follows:
```
@SuggestionBot input
```

To declare a channel as the suggestion output channel, simply send a message in that channel as follows:
```
@SuggestionBot output
```

That's all there is to it! 

## Bot Usage
When a user wants to submit a new suggestion, all they have to do is click the button on the suggestion prompt channel. By default, this button is labeled "New Suggestion". The bot will then DM the user and prompt them for their suggestion. Upon responding to the bot, it will ask the user to confirm or cancel their suggestion via button prompts. Upon confirmation, their suggestion will be sent to the suggestion output channel. It's really that simple.

## Message Configuration
All strings used by SuggestionBot are configurable by editing values found in the labels.json file.