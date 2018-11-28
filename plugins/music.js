const Commands  = require('../commands.js');
const helper    = require('../helper.js');
const DB        = require('../database/index.js');
const config    = require('../config.json');

class Music extends Commands{
  constructor(client){
    super(client);
    this.queue = {};

    
    this.registerCommand({
      aliases:    'join',
      callback:   this.join.bind(this),
    });

    this.registerCommand({
      aliases:    'play',
      callback:   this.play.bind(this),
    });

    this.registerCommand({
      aliases:    'leave',
      callback:   this.leave.bind(this),
    });

    this.registerCommand({
      aliases:    'pause',
      callback:   this.pause.bind(this),
    });

    this.registerCommand({
      aliases:    'resume',
      callback:   this.resume.bind(this),
    });

    helper.log("Loaded plugin: Music");
  }

  leave(msg){
    if(typeof this.queue[msg.guild.id] !== 'undefined')
      this.queue[msg.guild.id].channel.leave()
  }

  pause(msg){
    this.queue[msg.guild.id].dispatcher.pause();
  }
 
  resume(msg){ 
    this.queue[msg.guild.id].dispatcher.resume();
  }

  play(msg){
    const guildID = msg.guild.id;

    this.queue[guildID].dispatcher = this.queue[guildID].connection.playFile('C:/discordbot/music.mp3');
  }

  join(msg){
    const guildID = msg.guild.id;

    msg.member.voiceChannel
      .join()
      .then(connection => {
        this.queue[guildID] = {
          connection:     connection,
          dispatcher:     null,
          channel:        msg.member.voiceChannel,
        }
      })
  }

}

module.exports = Music;