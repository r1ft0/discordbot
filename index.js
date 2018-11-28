const helper    = require('./helper.js');
const Discord   = require('discord.js');
const config    = require('./config.json');

const client    = new Discord.Client()

client.login(config.token)

client.on('ready', event => {
  helper.logEvent(client, 'ready')

  
  require('./database/index.js')(client);
  require('./plugins.js')(client);
})

client.on("message", (message) => {
  if(message.content == "=help"){
    message.channel.send("The end is near no one cal you");
  }
});