const { Client, GatewayIntentBits, Events } = require("discord.js");
require("dotenv").config();

class MusicBot {
  client;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
      ],
    });

    this.client.on(Events.ClientReady, () =>
      console.log(`Logged in as ${this.client.user.tag}!`),
    );
  }

  start() {
    this.client.login(process.env.DISCORD_BOT_TOKEN);
  }
}

module.exports = { MusicBot };
