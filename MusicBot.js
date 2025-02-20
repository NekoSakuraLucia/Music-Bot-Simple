const { Client, GatewayIntentBits, Events, Collection } = require("discord.js");
const { LavalinkManager } = require("lavalink-client");
const { EventLoader } = require("./utils/loadEvents");
const { CommandLoader } = require("./utils/loadCommands");
require("dotenv").config();

class MusicBot {
  client;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
      ],
    });

    this.client.commands = new Collection();
    this.initializeLavalink();
    new EventLoader(this.client);
    new CommandLoader(
      this.client,
      process.env.DISCORD_BOT_TOKEN,
      process.env.DISCORD_BOT_CLIENT_ID,
      process.env.DISCORD_BOT_GUILD_ID,
    );
  }

  initializeLavalink() {
    this.client.lavalink = new LavalinkManager({
      nodes: [
        {
          authorization: process.env.LAVALINK_PASSWORD,
          host: process.env.LAVALINK_URI,
          port: parseInt(process.env.LAVALINK_PORT),
          id: process.env.LAVALINK_NAME,
        },
      ],
      sendToShard: (guildId, payload) =>
        this.client.guilds.cache.get(guildId)?.shard?.send(payload),
      autoSkip: true,
      client: {
        id: process.env.DISCORD_BOT_CLIENT_ID,
        username: "TESTBOT",
      },
    });

    this.client.on("raw", (d) => this.client.lavalink.sendRawData(d));
    this.client.lavalink.nodeManager
      .on("connect", (node) => {
        console.log(`Lavalink is Ready on ${node.id}`);
      })
      .on("disconnect", (node) => {
        console.log(`Lavalink is Disconnect on ${node.id}`);
      })
      .on("reconnecting", (node) => {
        console.log(`Lavalink is Reconnecting on ${node.id}`);
      });
  }

  start() {
    this.client.login(process.env.DISCORD_BOT_TOKEN);
  }
}

module.exports = { MusicBot };
