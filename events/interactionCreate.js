const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`ไม่พบคำสั่ง: ${interaction.commandName}`);
      await interaction.reply({
        content: "คำสั่งนี้ไม่ถูกต้องหรือไม่พบในระบบ!",
        ephemeral: true,
      });
      return;
    }

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการรันคำสั่ง:", error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "มีข้อผิดพลาดบางอย่างเกิดขึ้น!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "มีข้อผิดพลาดบางอย่างเกิดขึ้น!",
          ephemeral: true,
        });
      }
    }
  },
};
