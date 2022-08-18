const { MessageEmbed } = require("discord.js");
const { emojis, Bots } = require("../../config.json");
const database = require("quick.db");
module.exports = client => ({
  event: 'guildMemberAdd',
  async run(user) {
    if (!user.guild) return;
    if(!user.user.bot) return;
    if(!user.guild.me.hasPermission('ADMINISTRATOR')) return;
    var data = database.get(`protection_${user.guild.id}.antibots`);
    if(!data) return;
    if(data && data.toggle == "off") return;
      var DataRole = database.get(`protection_${user.guild.id}.role`); 
      if(DataRole) DataRole = user.guild.roles.cache.get(DataRole);
      var DataLog = database.get(`protection_${user.guild.id}.log`); 
      if(DataLog) DataLog = user.guild.channels.cache.get(DataLog);
      const fetchedLogs = await user.guild.fetchAuditLogs({ limit: 1, type: "BOT_ADD" });
      const CreateLog = fetchedLogs.entries.first();
      if(!CreateLog) return;
      let { executor, target, reason } = CreateLog;
      if(!executor && !target) return;
      let Admin = user.guild.members.cache.get(executor.id);
    const bot = user;
    const guild = user.guild;
    if (Admin.id == user.guild.ownerID) return;
    if(Admin.id === client.user.id || Bots.includes(Admin.id)) return;
    const perRoleUser = Admin.roles.cache.find(e => e.permissions.has("MANAGE_GUILD"));
    const perRoleBot = bot.roles.cache.find(e => e.permissions.has("MANAGE_GUILD"));
    let em = emojis.err;
    let emBot = emojis.err;
    let admin = false;
    if(DataRole && Admin.roles.cache.get(DataRole.id)) admin = true;
    if(!admin) {

    if (Admin.bannable && data.action == "ban") {
      Admin.ban({ days: 7, reason: 'antibots' }).catch();
      em = emojis.done
      }
//
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
    if (bot.bannable && data.actionBot == "ban") {
      bot.ban({ days: 7, reason: 'antibots' }).catch();
      em = emojis.done
      }
    if(bot.kickable && data.actionBot == "kick") {
      bot.kick('antibots').catch();
      emBot = emojis.done;
  }
//  
    if(perRoleBot && perRoleBot.managed && data.actionBot == "removePreBot") {
      perRoleBot.setPermissions(0,['antibots']).catch(); 
      emBot = emojis.done;
    }
//  
    }
     const owner = user.guild.owner;

    if (data.action == "ban") data.action = 'حظر'
    if (data.action == "kick") data.action = 'طرد'
    if (data.action == "removePreUser") data.action = 'ازالة صلاحيات المستخدم'
    if (data.action == "removeRoles") data.action = 'سحب رتب المستخدم';
    if (data.actionBot == "ban") data.action = 'حظر'
    if (data.actionBot == "kick") data.actionBot = 'طرد البوت'
    if (data.actionBot == "removePreBot") data.actionBot = 'ازالة صلاحيات البوت'

     let sendlog = new MessageEmbed() 
    .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
    .setTitle(`**تنبية لـ حماية البوتات**`)
    .addField(`**${emojis.bot} | البوت :**`, bot)
    .addField(`**${emojis.admin} | المستخدم الذي اضافة :**`,Admin)
    .addField(`**> لقد تم أتخاذ الإجراءات المحدده**`,[
    `**${em} | ${data.action}**`,
    `**${emBot} | ${data.actionBot}**`])
    .setThumbnail(user.user.avatarURL())
    .setTimestamp();
    if(DataLog) log.send(sendlog).catch();
    if(!DataLog) channel.guild.owner.send(sendlog).catch();
    
  } 
});