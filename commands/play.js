const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("สั่งให้บอทเล่นเพลงตามที่คุณสั่ง")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("ป้อน URL เพื่อเล่นเพลง")
        .setRequired(true),
    ),
  async execute(interaction, client) {
    try {
      if (!interaction.guildId) return;
      await interaction.deferReply();

      const voiceId = interaction.member.voice.channelId;
      if (!voiceId) return interaction.editReply("คุณยังไม่ได้อยู่ในช่องเสียง");

      const player = client.lavalink.createPlayer({
        guildId: interaction.guildId,
        voiceChannelId: voiceId,
        textChannelId: interaction.channelId,
        selfDeaf: true,
        selfMute: false,
        volume: 100,
      });

      await player.connect();
      const song = interaction.options.getString("song");
      const search = await player.search(
        {
          query: song,
        },
        interaction.user,
      );

      if (!search || !search.tracks.length)
        return interaction.editReply("ไม่พบเพลงที่ค้นหา");
      const tracks = search.tracks[0];
      await player.queue.add(tracks);
      if (!player.playing) player.play();

      return interaction.editReply(`กำลังเล่นเพลง: ${tracks.info.title}`);
    } catch (error) {
      console.error(error);
    }
  },
};
