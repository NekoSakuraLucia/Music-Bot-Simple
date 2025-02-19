const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ตอบกลับด้วย Pong!"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
