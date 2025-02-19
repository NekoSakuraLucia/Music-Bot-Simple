const { Client, GatewayIntentBits, Events } = require("discord.js");
const { LavalinkManager } = require("lavalink-client");
require("dotenv").config();

class MusicBot {
  client;
  lavalink;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
      ],
    });

    this.lavalink = new LavalinkManager({
      nodes: [
        {
          authorization: process.env.LAVALINK_PASSWORD,
          host: process.env.LAVALINK_URI,
          port: parseInt(process.env.LAVALINK_PORT),
          id: "testnode",
        },
      ],
      sendToShard: (guildId, payload) =>
        client.guilds.cache.get(guildId)?.shard?.send(payload),
      autoSkip: true,
      client: {
        id: process.env.DISCORD_BOT_CLIENT_ID,
        username: "TESTBOT",
      },
    });

    this.client.on("raw", (d) => this.lavalink.sendRawData(d));
    this.client.on(
      Events.ClientReady,
      () => console.log(`Logged in as ${this.client.user.tag}!`),
      this.lavalink.init(this.client.user),
    );

    this.lavalink.nodeManager.on("connect", (node) => {
      console.log(`Lavalink is Ready on ${node.id}`);
    });
  }

  start() {
    this.client.login(process.env.DISCORD_BOT_TOKEN);
  }
}

module.exports = { MusicBot };
