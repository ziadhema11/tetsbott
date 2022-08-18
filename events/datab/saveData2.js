const { MessageEmbed } = require("discord.js");

module.exports = client => ({
  event: 'guildMemberUpdate',
  run(oldMember, newMember) {
    if (!oldMember.guild || !newMember.guild) return;
    newMember.roles.cache.map(role => {
      let members = role.guild.members.cache.filter(member => member.roles.cache.has(role.id));
      client.roles.set(role.id, members.array());
    });
  }
});