const { Command } = require("../modules/command");

module.exports = new Command({
	name: "ping",
	description: "latency of this bot",

	execute({ client, interaction }) {
		interaction.reply({
			content: `${client.ws.ping} ms`,
		});
	},
});
