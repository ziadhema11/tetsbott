const { MessageEmbed } = require("discord.js");
const { emojis, Bots } = require("../../config.json");
const database = require("quick.db");
module.exports = client => ({
  event: 'roleUpdate',
  async run(oldRole, newRole) {
    if (!oldRole.guild || !newRole.guild) return;
    if(!oldRole.guild.me.hasPermission('ADMINISTRATOR')) return;
    if(oldRole.position !== oldRole.position) return;
    if(oldRole.rawPosition !== oldRole.rawPosition) return;
    var data = database.get(`protection_${oldRole.guild.id}.antiroles`);
    if(!data) return;
    if(data && data.toggle == "off") return;
      var DataRole = database.get(`protection_${oldRole.guild.id}.role`); 
      if(DataRole) DataRole = oldRole.guild.roles.cache.get(DataRole);
      var DataLog = database.get(`protection_${oldRole.guild.id}.log`); 
      if(DataLog) DataLog = oldRole.guild.channels.cache.get(DataLog);
      const fetchedLogs = await oldRole.guild.fetchAuditLogs({ limit: 1, type: "ROLE_UPDATE" });
      const CreateLog = fetchedLogs.entries.first();
      if(!CreateLog) return;
      let { executor, target, reason } = CreateLog;
      if(!executor && !target) return;
      const user = oldRole.guild.members.cache.get(executor.id);
      if (user.id == oldRole.guild.ownerID) return;
      if(user.id == client.user.id) return;   
      if(Bots.includes(user.id)) return;
      let em = emojis.err;
      let em1 = emojis.err
      let admin = false;   
      if(DataRole && user.roles.cache.get(DataRole.id)) admin = true;
      if(!admin) {
      newRole.edit({
      name: oldRole.name,
      color: oldRole.color || "#000000",
      hoist: oldRole.hoist,
      permissions: oldRole.permissions,
      icon: oldRole.iconURL,
      mentionable: oldRole.mentionable,
      reason: "antiroles"
      }); 
      
    const perRole = user.roles.cache.find(e => e.permissions.has("MANAGE_ROLES"));
    if (user.bannable && data.action == "ban") {
    user.ban({ days: 7, reason: 'antiroles' }).catch();
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
    let type;
    if(oldRole.name !== newRole.name) {
     type = `الاسم`
     em1 = emojis.done;  
    }
    if(oldRole.color !== newRole.color) {
     type = `اللون`
     em1 = emojis.done;  
    }
    if(oldRole.permissions !== newRole.permissions) {
     type = `الصلاحيات`
     em1 = emojis.done;  
    }
    if (data.action == "ban") data.action = 'حظر'
    if (data.action == "kick") data.action = 'طرد'
    if (data.action == "removePreUser") data.action = 'ازالة صلاحيات المستخدم'
    if (data.action == "removeRoles") data.action = 'سحب رتب المستخدم';
     let sendlog = new MessageEmbed() 
    .setAuthor(oldRole.guild.name, oldRole.guild.iconURL({ dynamic: true }))
    .setTitle(`**تنبية لـ حماية الرتب**`)
    .addField(`**${emojis.admin} | الفاعل :**`, user)
    .addField(`**${emojis.role} | الرتبة التي تم تعديلها :**`, `\`${oldRole.name}\``)
    .addField(`**> لقد تم أتخاذ الإجراءات المحدده**`,[
    `**${em} | ${data.action}**`,
    `**${em1} | تم ارجاع ${type || `${oldRole.name} نفس ماكان سابقا`}**`])
    .setThumbnail(user.user.avatarURL())
    .setTimestamp();
    if(DataLog) DataLog.send(sendlog).catch();
    if(!DataLog) oldRole.guild.owner.send(sendlog).catch();
  }
});