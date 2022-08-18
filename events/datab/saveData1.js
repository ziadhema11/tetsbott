const { MessageEmbed } = require("discord.js");
const { wait } =require('util');

module.exports = client => ({
  event: 'channelUpdate',
  async run(oldChannel, newChannel) {
    if (!oldChannel.guild || !newChannel.guild) return;
    setTimeout(() => {
      newChannel.guild.roles.cache.array().forEach(role => {
       let channels = oldChannel.guild.channels.cache.filter(c => c.permissionOverwrites.has(role.id));
        if (channels.array().length) client.cha.set(role.id, channels.array().map(e => ({ ...e })));
      }); 
    }, 5000);
    if(newChannel.parentID == null) return;
    if(oldChannel.parentID !== newChannel.parentID) {
       oldChannel.guild.channels.cache.filter(c => c.type == 'category').array().forEach(category => {
        let channels1 = category.guild.channels.cache.filter(c => c.parentID == category.id);
      client.category.set(category.id, channels1.array());
      });
    }
  }
});