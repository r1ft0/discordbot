const helper    = require('./helper.js');
const config    = require('./config.json');
const path      = require('path');
const fs        = require('fs');

const plugins = (client) => {
  const pluginPath = path.join(__dirname, config.pluginDir);
  fs.readdirSync(pluginPath).forEach(file => {
    new (require(pluginPath+'/'+file))(client);
  });
  
  helper.log('Plugins initialized')
}

module.exports = plugins;