const mongoose 		= require('mongoose');
const helper      = require('../helper.js');
const cfg         = require('../config.json');

module.exports = (client) => {
  
  mongoose
  .connect(
    `mongodb://${cfg.db.host}:${cfg.db.port}/${cfg.db.database}`,
    { useNewUrlParser: true }
  ).then(
    () => {
      helper.log('Connected to the database');
    },
    err => {
      console.log(err)
      helper.logError(client, err);
      process.exit(1);
    }
  )

  return module.exports = {
    leaderboard: 				require('./models/leaderboard')(mongoose.connection),
  }
}