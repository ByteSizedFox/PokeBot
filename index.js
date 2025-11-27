const robot = require('@jitsi/robotjs');

robot.setKeyboardDelay(50);

const { Client, GatewayIntentBits } = require('discord.js');

const BOT_CHANNEL = 1443670506107703489;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('clientReady', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if(message.channel.id != BOT_CHANNEL) return;
  
  if (message.content === '!up') {
    robot.keyTap('up');
    return;
  }
  if (message.content === '!down') {
    robot.keyTap('down');
    return;
  }
  if (message.content === '!left') {
    robot.keyTap('left');
    return;
  }
  if (message.content === '!right') {
    robot.keyTap('right');
    return;
  }

  if (message.content === '!a') {
    robot.keyTap('x');
    return;
  }
  if (message.content === '!b') {
    robot.keyTap('z');
    return;
  }
  if (message.content === '!x') {
    robot.keyTap('s');
    return;
  }
  if (message.content === '!y') {
    robot.keyTap('a');
    return;
  }
  if (message.content === '!left') {
    robot.keyTap('q');
    return;
  }
  if (message.content === '!right') {
    robot.keyTap('w');
    return;
  }
  if (message.content === '!start') {
    robot.keyTap('enter');
    return;
  }
  if (message.content === '!select') {
    robot.keyTap('shift');
    return;
  }
});

client.login(process.env.BOT_TOKEN);
