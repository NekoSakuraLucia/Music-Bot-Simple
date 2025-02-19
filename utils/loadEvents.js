const { readdirSync } = require("fs");
const path = require("path");

class EventLoader {
  constructor(client, lavalink) {
    this.client = client;
    this.lavalink = lavalink;
    this.loadEvents();
  }

  loadEvents() {
    const eventPath = path.join(__dirname, "../events");
    const eventFiles = readdirSync(eventPath).filter((file) =>
      file.endsWith(".js"),
    );

    for (const file of eventFiles) {
      const eventName = file.split(".")[0];
      const event = require(path.join(eventPath, file));

      if (!event.name || typeof event.execute !== "function") {
        console.warn(
          `Event ${file} ไม่ถูกต้อง: ต้องมี property 'name' และ method 'execute'`,
        );
        continue;
      }

      if (event.once) {
        this.client.once(event.name, (...args) =>
          event.execute(...args, this.client),
        );
      } else {
        this.client.on(event.name, (...args) =>
          event.execute(...args, this.client),
        );
      }
    }
  }
}

module.exports = { EventLoader };
