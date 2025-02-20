const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("หยุดเพลง และ สั่งให้บอทออกจากช่องเสียง"),
  async execute(interaction, client) {
    try {
      if (!interaction.guildId) return;
      await interaction.deferReply();

      const player = client.lavalink.getPlayer(interaction.guildId);
      await player.destroy();

      return interaction.editReply("หยุดเพลง และ ออกจากช่องเสียงแล้ว!");
    } catch (error) {
      console.error(error);
    }
  },
};
