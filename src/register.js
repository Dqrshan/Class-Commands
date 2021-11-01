const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = async () => {
	const commands = [];

	const clientId = process.env.CLIENT;
	const guildId = process.env.GUILD;

	const commandFiles = fs
		.readdirSync("src/commands")
		.filter((f) => f.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);

		commands.push(command);
	}

	const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
			body: commands,
		});

		/**
		 * @globalCommands
		 * await rest.put(Routes.applicationCommands(clientId), {
		 *  body: commands
		 * })
		 */

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
};
