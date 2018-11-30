const helper    = require('./helper.js');
const Discord   = require('discord.js');
const config    = require('./config.json');

const client    = new Discord.Client()

client.login(config.token)

client.on('ready', event => {
  helper.logEvent(client, 'ready');
  
  require('./database/index.js')(client);
  require('./plugins.js')(client);
});

client.on("guildCreate", guild => {
  
  guild.channels
    .find(val => val.name === 'general')
    .send("Privet amerikanski spies, my name is Ivan Ivanovski. If you need me just say cyka blyat.")
});

// https://discordapp.com/api/oauth2/authorize?client_id=515959566803009540&scope=bot&permissions=8