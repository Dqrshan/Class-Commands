require("dotenv").config();
const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");

const client = new Client({
	intents: [
		/**
		 * @Intents
		 * enable only required intents
		 */
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		// Intents.FLAGS.GUILD_BANS,
		// Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		// Intents.FLAGS.GUILD_INTEGRATIONS,
		// Intents.FLAGS.GUILD_WEBHOOKS,
		// Intents.FLAGS.GUILD_INVITES,
		// Intents.FLAGS.GUILD_VOICE_STATES,
		// Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILD_MESSAGES,
		// Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		// Intents.FLAGS.GUILD_MESSAGE_TYPING,
		// Intents.FLAGS.DIRECT_MESSAGES,
		// Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
		// Intents.FLAGS.DIRECT_MESSAGE_TYPING
	],
});

// command handling
client.commands = new Collection();

const commandFiles = fs
	.readdirSync(`src/commands`)
	.filter((f) => f.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

// load events
const eventFiles = fs
	.readdirSync(`src/events/`)
	.filter((f) => f.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	const name = file.split(".")[0];

	client.on(name, event.bind(null, client));
}

// register slash commands
require("./register")();

// login to bot
client.login(process.env.TOKEN);
