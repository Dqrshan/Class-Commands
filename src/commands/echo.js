const { Command } = require("../modules/command");

module.exports = new Command({
	name: "echo",
	description: "echoes your message",
	options: [
		{
			name: "message",
			type: "STRING",
			description: "message to echo",
			required: true,
		},
	],

	async execute({ interaction }) {
		const message = interaction.options.getString("message");

		await interaction.reply({
			content: `**${interaction.user.tag}** said: **\`${message}\`**`,
		});
	},
});
