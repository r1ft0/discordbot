const Commands  = require('../commands.js');
const helper    = require('../helper.js');
const DB        = require('../database/index.js');
const config    = require('../config.json');

class Moderation extends Commands{
  constructor(client){
    super(client);

    
    this.registerCommand({
      aliases:    'ban',
      callback:   this.ban,
    });
    
    this.registerCommand({
      aliases:    'debug',
      callback:   this.debug.bind(this),
    });

    helper.log("Loaded plugin: Moderation");
  }

  ban(){

  }

  debug(){
    console.log(this.client.voiceConnections.array().length)
  }

}

module.exports = Moderation;