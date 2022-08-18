const { MessageEmbed, MessageAttachment } = require('discord.js');
const { emojis,appc, enable,logo, system, admins } = require("../../config.json");
const mange = require("quick.db");
const Canvas = require("canvas");
var randomNumber = require('random-number');
const moment = require('moment');
const inlinereply = require('discord-reply');

module.exports.run = async(message, args, client) => { 
    var role = message.mentions.roles.first();
    if (!role) return message.lineReplyNoMention("** منشن الرتبة من فضلك ! **");
    let s = message.guild.members.cache.filter(m => m.roles.cache.get(role.id));

    moment.locale("ar");
    let Embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(`${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      )
      .setThumbnail(message.author.avatarURL())
      .addField(`**❯ الرتبه:**`, `**${role}**`)
      .addField(`**❯ عدد مستخدمين الرتبه:**`, `\`${s.size}\``)
      .addField(`**❯ تم انشائها:**`, `\`${moment(role.createdAt).fromNow()}\``)
      .setFooter(
        `Requested By: ${message.author.username}`,
        message.author.avatarURL({ dynamic: true })
      );
    let Embed1 = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`** هل تريد اظهار مستخدمين الرتبة ؟ **`);

    let Embed2 = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(
        `**❯ مستخدمين الرتبه:**\n- ${s
          .map(m => "<@" + m.user.id + ">")
          .join("\n- ")}`
      );

    message.lineReplyNoMention(Embed)
      .then(async () => {
        let msg = await message.channel.send(Embed1);

        await msg.react("✅");
        await msg.react("❌");

        let collector = msg.createReactionCollector(
          (reaction, user) => user.id === message.author.id
        );

        collector.on("collect", async (reaction, user) => {
          if (reaction.emoji.name === "✅") {
            msg.reactions.removeAll();
            msg.edit(Embed2);
          }
          if (reaction.emoji.name === "❌") {
            msg.delete();
          }
        });
      })
      .catch(err => message.reply(`**لايمكنني اظهار عدد الاعضاء لان العدد اكبر من 200`));
}
module.exports.help = {
  name: 'info-role',
  description: "معلومات عن الرتبة.",
  usage: ["info-role (role)"],
  admin: true,
  permissions: ["MANAGE_ROLES"]
}