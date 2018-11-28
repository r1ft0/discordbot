const Commands  = require('../commands.js');
const helper    = require('../helper.js');
const DB        = require('../database/index.js');
const config    = require('../config.json');

class Leaderboard extends Commands{
  constructor(client){
    super(client);

    this.registerCommand({
      aliases:    'rank',
      callback:   this.getRank.bind(this)
    });

    client.on('message', msg => this.messageSent(msg));

    helper.log("Loaded plugin: Leaderboard");
  }

  messageSent(msg) {
    if(msg.author.bot)
      return;

    if(typeof msg.member.user.levels === 'undefined')
      this.setMemberRank(msg.member.user);

    const cooldown = Math.ceil((msg.createdTimestamp - msg.member.user.levels.timestamp) / 1000)

    if(config.leaderboard.cooldown < cooldown)
      msg.member.user.levels.exp += 1;
    
    msg.member.user.levels.timestamp = msg.createdTimestamp
  } 

  getRank(msg){
    let member = msg.mentions.users.first();

    if(typeof member === 'undefined')
      member = msg.member.user;

    if(typeof member.levels == 'undefined')
      this.setMemberRank(member);

    const embed = {
      "description": `${member.username} # ${member.levels.rank} `,
      "color": 3497618,
      "thumbnail": {
        "url": member.displayAvatarURL
      },
      "fields": [
        {
          "name": "level",
          "value": member.levels.level,
          "inline": true
        },
        {
          "name": "exp",
          "value": member.levels.exp,
          "inline": true
        }
      ]
    };
    msg.channel.send({ embed });
  }

  setMemberRank(member){
    member.levels = {
      exp: 0,
      level: 0,
      rank: 0,
      timestamp: + new Date()
    }
  }
}

module.exports = Leaderboard;