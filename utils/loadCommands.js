const { REST, Routes } = require("discord.js");
const { readdirSync } = require("fs");
const path = require("path");

class CommandLoader {
  constructor(client, token, clientId, guildId = null) {
    this.client = client;
    this.token = token;
    this.clientId = clientId;
    this.guildId = guildId;
    this.loadCommands();
  }

  loadCommands() {
    const commandsData = [];
    const commandsPath = path.join(__dirname, "../commands");
    const commandFiles = readdirSync(commandsPath).filter((file) =>
      file.endsWith(".js"),
    );

    for (const file of commandFiles) {
      try {
        const commandModule = require(path.join(commandsPath, file));
        if (!commandModule.data || !commandModule.execute) {
          console.warn(
            `คำสั่ง ${file} ไม่ถูกต้อง: ต้องมี property 'data' และ 'execute'`,
          );
          continue;
        }

        const command = commandModule;
        const commandData = command.data.toJSON();
        commandsData.push(commandData);
        this.client.commands.set(command.data.name, command);
      } catch (error) {
        console.error(`เกิดข้อผิดพลาดในการโหลดคำสั่ง ${file}:`, error);
      }
    }

    const rest = new REST({ version: "10" }).setToken(this.token);

    (async () => {
      try {
        console.log("กำลังลงทะเบียนคำสั่งแอปพลิเคชัน...");

        if (this.guildId) {
          await rest.put(
            Routes.applicationGuildCommands(this.clientId, this.guildId),
            { body: commandsData },
          );
          console.log(`ลงทะเบียนคำสั่งสำหรับ guild ${this.guildId} สำเร็จ!`);
        } else {
          await rest.put(Routes.applicationCommands(this.clientId), {
            body: commandsData,
          });
          console.log("ลงทะเบียนคำสั่ง global สำเร็จ!");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการลงทะเบียนคำสั่ง:", error);
      }
    })();
  }
}

module.exports = { CommandLoader };
