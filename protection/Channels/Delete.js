const { MessageEmbed } = require("discord.js");
const { emojis, Bots } = require("../../config.json");
const database = require("quick.db");
module.exports = client => ({
  event: "channelDelete",
  async run(channel) {
    if (!channel.guild) return;
    if (!channel.guild.me.hasPermission('ADMINISTRATOR')) return;
    const queue = client.queue;
    const data = database.get(`protection_${channel.guild.id}.antichannels`);
    if (!data) return;
    if (data && data.toggle == "off") return;
    var DataRole = database.get(`protection_${user.guild.id}.role`);
    if (DataRole) DataRole = user.guild.roles.cache.get(DataRole);
    var DataLog = database.get(`protection_${user.guild.id}.log`);
    if (DataLog) DataLog = user.guild.channels.cache.get(DataLog);
    const fetchedLogs = await user.guild.fetchAuditLogs({ limit: 1, type: "CHANNEL_UPDATE" });
    const CreateLog = fetchedLogs.entries.first();
    if (!CreateLog) return;
    let { executor, target, reason } = CreateLog;
    if (!executor && !target) return;
    const user = channel.guild.members.cache.get(executor.id);
    if (user.id == channel.guild.ownerID) return;
    if (user.id === client.user.id) return;
    if (Bots.includes(user.id)) return;
    let em = emojis.err;
    let em1 = emojis.err;
    let admin = false;
    if (DataRole && user.roles.cache.get(DataRole.id)) admin = true
    if (!admin) {
      em1 = emojis.done;
      channel.guild.channels.create(channel.name, {
        parent: channel.parentID,
        position: channel.rawPosition,
        type: channel.type,
        rateLimitPerUser: channel.rateLimitPerUser,
        userLimit: channel.userLimit,
        bitrate: channel.bitrate,
        nsfw: channel.nsfw,
        topic: channel.topic,
        reason: "antichannels",
        permissionOverwrites: channel.permissionOverwrites
      }).then(newChannel => {
        if (channel.id == database.get(`protection_${channel.guild.id}.log`)) {
          database.set(`protection_${channel.guild.id}.log`, newChannel.id)
          log = newChannel;
          newChannel.send("تم ارجاع اللوق المحذوف !.")
        }
        if (channel.type == "category") {
          let channels = client.category.get(channel.id);
          if (channels) {
            channels.forEach(c => {
              let che = channel.guild.channels.cache.get(c.id);
              if (!che) return;
              che.setParent(newChannel).catch();
            })
          }
        }

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
      })
    }
    let text;
    let type;
    if (channel.type == "text") {
      text = `**${emojis.channel} | الشات المحذوف :**`
      type = `شات`
    }
    if (channel.type == "voice") {
      text = `**${emojis.voice} | الروم المحذوف :**`
      type = `روم`
    }
    if (channel.type == "category") {
      text = `**${emojis.category} | الكاتورجي المحذوف :**`
      type = `كاتورجي`
    }
    if (data.action == "ban") data.action = 'حظر'
    if (data.action == "kick") data.action = 'طرد'
    if (data.action == "removePreUser") data.action = 'ازالة صلاحيات المستخدم'
    if (data.action == "removeRoles") data.action = 'سحب رتب المستخدم';
    let sendlog = new MessageEmbed()
      .setAuthor(channel.guild.name, channel.guild.iconURL({ dynamic: true }))
      .setTitle(`**تنبية لـ حماية الشاتات**`)
      .addField(`**${emojis.admin} | الفاعل :**`, user)
      .addField(text, `\`${channel.name}\``)
      .addField(`**> لقد تم أتخاذ الإجراءات المحدده**`, [
        `**${em} | ${data.action}**`,
        `**${em1} | تم ارجاع ${type}**`])
      .setThumbnail(user.user.avatarURL())
      .setTimestamp();
    if (DataLog) log.send(sendlog).catch();
    if (!DataLog) channel.guild.owner.send(sendlog).catch();

  }
});