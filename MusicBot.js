const { Client, GatewayIntentBits, Events } = require("discord.js");
const { Shoukaku, Connectors } = require("shoukaku");
require("dotenv").config();

const Nodes = [
  {
    name: process.env.LAVALINK_NAME,
    url: process.env.LAVALINK_URI,
    auth: process.env.LAVALINK_PASSWORD,
  },
];

class MusicBot {
  client;
  shoukaku;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
      ],
    });

    this.shoukaku = new Shoukaku(new Connectors.DiscordJS(this.client), Nodes);
    this.shoukaku.on("error", (_, error) => console.error(error));
    this.shoukaku.once("ready", (name) =>
      console.log(`Shoukaku is Ready! ${name}`),
    );

    this.client.on(Events.ClientReady, () =>
      console.log(`Logged in as ${this.client.user.tag}!`),
    );
  }

  start() {
    this.client.login(process.env.DISCORD_BOT_TOKEN);
  }
}

module.exports = { MusicBot };
