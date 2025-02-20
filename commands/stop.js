const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("หยุดเพลง และ สั่งให้บอทออกจากช่องเสียง"),
  async execute(interaction, client) {
    try {
      if (!interaction.guildId) return;
      await interaction.deferReply();

      const voiceId = interaction.member.voice.channelId;
      if (!voiceId) return interaction.editReply("คุณยังไม่ได้อยู่ในช่องเสียง");
      const player = client.lavalink.getPlayer(interaction.guildId);
      if (!player)
        return interaction.editReply("บอทไม่ได้เชื่อมต่อกับช่องเสียง");

      await player.destroy();
      return interaction.editReply("หยุดเพลง และ ออกจากช่องเสียงแล้ว!");
    } catch (error) {
      console.error(error);
    }
  },
};
