const { MessageEmbed } = require("discord.js");
const { emojis, Bots } = require("../../config.json");
const database = require("quick.db");
module.exports = client => ({
  event: "roleCreate",
  async run(role) {
      if (!role.guild) return;
      if(!role.guild.me.hasPermission('ADMINISTRATOR')) return;
      const queue = client.queue;
      const data = database.get(`protection_${role.guild.id}.antiroles`);
      if(!data) return;
      if (data && data.toggle == "off") return;
      var DataRole = database.get(`protection_${role.guild.id}.role`); 
      if(DataRole) DataRole = role.guild.roles.cache.get(DataRole);
      var DataLog = database.get(`protection_${role.guild.id}.log`); 
      if(DataLog) DataLog = role.guild.channels.cache.get(DataLog);
      const fetchedLogs = await role.guild.fetchAuditLogs({ limit: 1, type: "ROLE_CREATE" });
      const CreateLog = fetchedLogs.entries.first();
      if(!CreateLog) return;
      let { executor, target, reason } = CreateLog;
      if(!executor && !target) return;
      let user = role.guild.members.cache.get(executor.id);
      if (user.id == user.guild.ownerID) return;
      if(user.id === client.user.id) return;   
      if(Bots.includes(user.id)) return;
      let em = emojis.err;   
      let em1 = emojis.err;   
      let admin = false;       
      if(DataRole && user.roles.cache.get(DataRole.id)) admin = true;
      if(!admin) {
      em1 = emojis.done
      role.delete('antichannels | حماية الرومات')
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
    if(role.type == "role") {
    text = `**${emojis.role} | الرتبة الذي تم انشائه :**`
    type = `الرتبة`
    }
    if (data.action == "ban") data.action = 'حظر'
    if (data.action == "kick") data.action = 'طرد'
    if (data.action == "removePreUser") data.action = 'ازالة صلاحيات المستخدم'
    if (data.action == "removeRoles") data.action = 'سحب رتب المستخدم';
     let sendlog = new MessageEmbed() 
    .setAuthor(role.guild.name, role.guild.iconURL({ dynamic: true }))
    .setTitle(`**تنبية لـ حماية الرتب**`)
    .addField(`**${emojis.admin} | الفاعل :**`, user)
    .addField(text, `\`${role.name}\``)
    .addField(`**> لقد تم أتخاذ الإجراءات المحدده**`,[
    `**${em} | ${data.action}**`,
    `**${em1} | تم حذف ${type}**`])
    .setThumbnail(user.user.avatarURL())
    .setTimestamp();
    if(DataLog) DataLog.send(sendlog).catch();
    if(!DataLog) role.guild.owner.send(sendlog).catch();
  }   
});