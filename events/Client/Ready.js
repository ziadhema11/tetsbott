const Discord = require("discord.js");
const db = require("quick.db");
module.exports = client => ({
  event: 'ready',
  run() {
    console.table([{ username: client.user.username, servers: client.guilds.cache.size }]);
    client.user.setActivity(db.get(`game`) || "-help");
    
    //require('../../dom/App')(client);
    console.log('Logged in as ' + client.user.tag);
  }
});

