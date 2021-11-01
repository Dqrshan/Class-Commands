const { Client } = require("discord.js");

/**
 * @param {Client} client
 */

module.exports = (client) => {
	console.log(`${client.user.username} online`);
	client.user.setActivity({
		name: "/help",
		type: "LISTENING",
	});
};
