const { MessageEmbed } = require("discord.js");
const { emojis, Bots } = require("../../config.json");
const database = require("quick.db");

module.exports = client => ({
  event: 'channelUpdate',
  async run(oldChannel, newChannel) {
    if (!oldChannel.guild || !newChannel.guild) return;
    if(!oldChannel.guild.me.hasPermission('ADMINISTRATOR')) return;
    if(oldChannel.position !== newChannel.position) return;
    if(oldChannel.rawPosition !== newChannel.rawPosition) return;
    const data = database.get(`protection_${oldChannel.guild.id}.antichannels`);
    if(!data) return;
    if (data && data.toggle == "off") return;
      var DataRole = database.get(`protection_${user.guild.id}.role`); 
      if(DataRole) DataRole = user.guild.roles.cache.get(DataRole);
      var DataLog = database.get(`protection_${user.guild.id}.log`); 
      if(DataLog) DataLog = user.guild.channels.cache.get(DataLog);
      const fetchedLogs = await user.guild.fetchAuditLogs({ limit: 1, type: "CHANNEL_UPDATE" });
      const CreateLog = fetchedLogs.entries.first();
      if(!CreateLog) return;
      let { executor, target, reason } = CreateLog;
      if(!executor && !target) return;
      const user = oldChannel.guild.members.cache.get(executor.id);
      if (user.id == oldChannel.guild.ownerID) return;
      if(user.id == client.user.id) return;
      if(Bots.includes(user.id)) return;
      let admin = false;  
      let em = emojis.err;      
      let em1 = emojis.err;          
      if(DataRole && user.roles.cache.get(DataRole.id)) admin = true
      if(!admin) { 
      em1 = emojis.done;  
      newChannel.edit({
      name: oldChannel.name,
      rateLimitPerUser: oldChannel.rateLimitPerUser,
      userLimit: oldChannel.userLimit,
      bitrate: oldChannel.bitrate,
      nsfw: oldChannel.nsfw,
      topic: oldChannel.topic,
      reason: "antichannels",
      }) 
    const perRole = user.roles.cache.find(e => e.permissions.has("MANAGE_ROLES"));
    if (user.bannable && data.action == "ban") {
    user.ban({ days: 7, reason: 'antichannels' }).catch();
    em = emojis.done
    }
    if (user.kickable && data.action == "kick") {
    user.kick('antichannels').catch();
    em = emojis.done
    }
    if (perRole && perRole.editable && data.action == "removePreUser") {
    perRole.setPermissions(0).catch();
    em = emojis.done
    }
    if (perRole && perRole.editable && data.action == "removeRoles") {
    user.roles.remove(perRole).catch();
    em = emojis.done
    }
    }
    let text;
    let type;
    if(oldChannel.name !== newChannel.name) {
     type = `??????????`
    }
    if(oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
     type = `?????? ??????????????`
    }
    if(oldChannel.topic !== newChannel.topic) {
     type = `??????????`
    }
    if(oldChannel.type == "text") {
    text = `**${emojis.channel} | ?????????? ???????? ???? ???????????? :**`    
    }
    if(oldChannel.type == "voice") {
    text = `**${emojis.voice} | ?????????? ???????? ???? ???????????? :**`
    }
    if(oldChannel.type == "category") {
    text = `**${emojis.category} | ?????????????????? ???????? ???? ???????????? :**`
    }
    if (data.action == "ban") data.action = '??????'
    if (data.action == "kick") data.action = '??????'
    if (data.action == "removePreUser") data.action = '?????????? ?????????????? ????????????????'
    if (data.action == "removeRoles") data.action = '?????? ?????? ????????????????';
     let sendlog = new MessageEmbed() 
    .setAuthor(oldChannel.guild.name, oldChannel.guild.iconURL({ dynamic: true }))
    .setTitle(`**?????????? ???? ?????????? ??????????????**`)
    .addField(`**${emojis.admin} | ???????????? :**`, user)
    .addField(text, `\`${oldChannel.name}\``)
    .addField(`**> ?????? ???? ?????????? ?????????????????? ??????????????**`,[
    `**${em} | ${data.action}**`,
    `**${em1} | ???? ?????????? ${type || `${oldChannel.name} ?????? ?????????? ??????????`}**`])
    .setThumbnail(user.user.avatarURL())
    .setTimestamp();
    if(DataLog) log.send(sendlog).catch();
    if(!DataLog) channel.guild.owner.send(sendlog).catch();
  }
});