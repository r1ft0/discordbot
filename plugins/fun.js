const Commands  = require('../commands.js');
const helper    = require('../helper.js');
const config    = require('../config.json');

class Fun extends Commands{
  constructor(client){
    super(client);
    client.on('message', msg => this.messageSent(msg));

    helper.log("Loaded plugin: Fun");
  }

  messageSent(msg) {
    if(msg.author.bot)
      return;

    const input = msg.content.toLowerCase();

    if(
      input.includes("are chavs even people") || input.includes("are chavs even ppl")
    ){
      msg.channel.send("no");
      return;
    }

    switch(input){
      case 'cyka blyat': case 'help': case 'commands':
        msg.channel.send("Times are hard my friend, my creator didn't put command list in yet.");
      break;
      case 'tfw no gf':
        msg.channel.send("tfw no olga", {
            file: "http://theivan.wtf/memes/slavgf.png"
        });
      break;
      case 'fuck':
        msg.channel.send("cyka blyat");
      break;
    }
  } 
}

module.exports = Fun;