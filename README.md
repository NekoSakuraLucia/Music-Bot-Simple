# Music-Bot-Simple

โค้ดบอทเพลงดิสคอร์ดฉบับ Simple ใช้ `discord.js v14` และใช้ `lavalink v4` เป็นตัวเล่นเพลงให้กับบอทเรา <br />
โค้ดบางส่วนเขียนด้วยรูปแบบ OOP ทำให้โค้ดอ่านได้ง่ายขึ้น

## วิธีการติดตั้ง และ ใช้งาน
1. frok และ clone repo
```sh
git clone https://github.com/NekoSakuraLucia/Music-Bot-Simple.git
```

2. ติดตั้ง dependencies
```sh
bun install
```

3. กำหนดค่าต่างๆ ใน `.env` (ต้องเปลี่ยนจาก .env.example เป็น .env ก่อนนะ)
```env
# Bot Config
DISCORD_BOT_TOKEN=
DISCORD_BOT_CLIENT_ID=
DISCORD_BOT_GUILD_ID=

# Lavalink Config
LAVALINK_NAME=TestNode
LAVALINK_URI=localhost
LAVALINK_PORT=2333
LAVALINK_PASSWORD=yourpassword
```

5. รันบอทเพื่อทดสอบ
```
node index.js

หรือ

node .
```

บอทมีทั้งหมด 3 คำสั่งในโฟลเดอร์ `commands/` คุณต้องไปเพิ่มคำสั่งเพิ่มเติมเอาเองหากอยากได้เพิ่ม เพราะ repo อันนี้เป็นเพียง Simple เท่านั้น <br />
<br />
copyright 2025 - NekoSakuraLucia, MIT License
