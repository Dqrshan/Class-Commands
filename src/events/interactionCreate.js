const { Client, CommandInteraction } = require("discord.js");

/**
 * @param {Client} client
 * @param {CommandInteraction} interaction
 */

module.exports = async (client, interaction) => {
	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		if (command.permissions && Array.isArray(command.permissions)) {
			for (const permission of command.permissions) {
				if (
					!interaction.member.permissions.has(permission) &&
					!interaction.channel
						.permissionsFor(interaction.member.id)
						.has(permission)
				) {
					interaction.reply({
						content: `Missing \`${permission}\` Permission`,
						ephemeral: true,
					});
				}
			}
		}
		await command.execute({ client, interaction });
	} catch (error) {
		console.log(error);
	}
};
