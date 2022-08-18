const { MessageEmbed } = require("discord.js");
const { emojis, Bots } = require("../../config.json");
const database = require("quick.db");
module.exports = client => ({
  once:false,
  event: 'guildMemberRemove',
  async run(user) {
    if (!user.guild) return;
    if(!user.guild.me.hasPermission('ADMINISTRATOR')) return;
    var data = database.get(`protection_${user.guild.id}.antiprune`);
    if(!data) return;
    if(data && data.toggle == "off") return;
      var DataRole = database.get(`protection_${user.guild.id}.role`); 
      if(DataRole) DataRole = user.guild.roles.cache.get(DataRole);
      var DataLog = database.get(`protection_${user.guild.id}.log`); 
      if(DataLog) DataLog = user.guild.channels.cache.get(DataLog);
      const fetchedLogs = await user.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_PRUNE" });
      const CreateLog = fetchedLogs.entries.first();
      if(!CreateLog) return;
      let { executor, target, reason } = CreateLog;
      if(!executor && !target) return;
      let Admin = user.guild.members.cache.get(executor.id);
      const guild = user.guild;
      if (Admin.id == user.guild.ownerID) return;
      if(Admin.id === client.user.id) return;   
      if(Bots.includes(Admin.id)) return;    
      const perRoleUser = Admin.roles.cache.find(e => e.permissions.has("MANAGE_GUILD"));
      let em = emojis.err;
      let admin = false;
      if(DataRole && Admin.roles.cache.get(DataRole.id)) admin = true;
      if(!admin) {

    if(Admin.bannable && data.action == "ban") {
      Admin.ban({ days: 7, reason: 'antichannels' }).catch();
      em = emojis.done; 
    }

    if(Admin.kickable && data.action == "kick") {
      Admin.kick('antibots').catch();
      em = emojis.done; 
    }
//
    if(perRoleUser && perRoleUser.editable && data.action == "removePreUser") {
      perRoleUser.setPermissions(0,['antibots']).catch();
      em = emojis.done;
  }
//
    if(perRoleUser && perRoleUser.editable && data.action == "removeRoles") {
      Admin.roles.remove(perRoleUser,['antibots']).catch()
      em = emojis.done;
  }
//  
    }
    if (data.action == "ban") data.action = 'حظر'
    if (data.action == "kick") data.action = 'طرد'
    if (data.action == "removePreUser") data.action = 'ازالة صلاحيات المستخدم'
    if (data.action == "removeRoles") data.action = 'سحب رتب المستخدم';
     let sendlog = new MessageEmbed() 
    .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
    .setTitle(`**تنبية لـ حماية البرون**`)
    .addField(`**${emojis.admin} | المستخدم الذي فعل البرون :**`,Admin)
    .addField(`**> لقد تم أتخاذ الإجراءات المحدده**`,[
    `**${em} | ${data.action}**`])
    .setThumbnail(guild.iconURL())
    .setTimestamp();
    if(DataLog) DataLog.send(sendlog).catch();
     if(!DataLog) user.guild.owner.send(sendlog).catch();
    
  } 
});