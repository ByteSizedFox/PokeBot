const RetroArchClient = require("./retroarch");

const DSclient = new RetroArchClient({ host: '127.0.0.1', port: 55355 });
await DSclient.connect();

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

  if (message.content === '!quit') {
    DSclient.send('QUIT');
    return;
  }
  
});

client.login(process.env.BOT_TOKEN);
