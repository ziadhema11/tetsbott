const Discord = require("discord.js");
module.exports = client => ({
  event: 'ready',
  run() {
      client.guilds.cache.array().forEach(guild => {
      guild.roles.cache.array().forEach(role => {
        let members = role.guild.members.cache.filter(member => member.roles.cache.has(role.id));
         client.roles.set(role.id, members.array());
         let channels = guild.channels.cache.filter(c => c.permissionOverwrites.has(role.id));
         client.cha.set(role.id, channels.array());
      });
      guild.channels.cache.filter(c => c.type == 'category').array().forEach(category => {
        let channels1 = category.guild.channels.cache.filter(c => c.parentID == category.id);
        client.category.set(category.id, channels1.array());
      });
    });
  }
});

