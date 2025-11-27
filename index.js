const robot = require('@jitsi/robotjs');
const { Client, GatewayIntentBits } = require('discord.js');

const BOT_CHANNEL = '1443670506107703489';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ]
});

robot.setKeyboardDelay(50);

const BUTTON_EMOJIS = {
  '⬆️': 'up',
  '⬇️': 'down',
  '⬅️': 'left',
  '➡️': 'right',
  '🅰️': 'x',    // A button
  '🅱️': 'z',    // B button
  '❌': 's',    // X button
  '🇾': 'a',    // Y button
  '🇱': 'q',    // L button
  '🇷': 'w',    // R button
  '▶️': 'enter', // Start
  '⏸️': 'shift' // Select
};

let controlMessage = null;

client.on('clientReady', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  
  // Send controller message
  const channel = await client.channels.fetch(BOT_CHANNEL);
  controlMessage = await channel.send('**RetroArch Controller**');
  
  // Add all button reactions
  for (const emoji of Object.keys(BUTTON_EMOJIS)) {
    await controlMessage.react(emoji);
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return;
  if (!controlMessage || reaction.message.id !== controlMessage.id) return;
  
  const key = BUTTON_EMOJIS[reaction.emoji.name];
  if (key) {
    robot.keyTap(key);
    console.log(key);

    // Remove user's reaction
    try {
      await reaction.users.remove(user.id);
    } catch (error) {
      console.error('Failed to remove reaction:', error);
    }
  }
});

client.login(process.env.BOT_TOKEN);
