const { MessageEmbed, MessageAttachment } = require('discord.js');
const { emojis } = require("../../config.json");
const mange = require("quick.db");
const inlinereply = require('discord-reply');
const disbut = require("discord-buttons");
const bot = '897504698662277130'
module.exports.run = async(message, args, client, prefix, lang) => {
    const data = mange.get(`protection_${message.guild.id}`);
    if(!['on','off'].includes(args[0])) 
    return message.lineReply(`> ${prefix}set-other (on / off) (role / channel)`)
    const un = message.guild.roles.cache.get(
        args[1] ? args[1].toRoleId() : ""
      ) || message.guild.channels.cache.get(
        args[1] ? args[1].toChannelId() : ""
      );
    if(!data) mange.set(`protection_${message.guild.id}`, {
    "role":null,
    "log": null,
    "antiroles": {
    toggle: "off",
    action: null
    },
    "antichannels":{
    toggle: "off",
    action: null
    },
    "antibots":{
    toggle: "off",
    actionBot: null,
    action: null
    },
    })
    if(!un) return message.lineReplyNoMention(`> ${emojis.err} **${prefix}set-other (role / channel)**`);
    let type;
    let index;
    let toggle;
    if(args[0] == "on") {
    toggle = 'تفعيل'
    if(un.type !== "text") {
    type = "رتبة"
    index = un.name
    mange.set(`protection_${message.guild.id}.role`,un.id);
    }
    if(un.type == "text") {
    type = "لوق"
    index = un.name
    mange.set(`protection_${message.guild.id}.log`,un.id);
    un.send('> **رسالة تجربة فقط.**')
    }
    }
    if(args[0] == "off") {
    toggle = 'الغاء تفعيل'
    if(un.type !== "text") {
    type = "رتبة"
    index = un.name
    mange.set(`protection_${message.guild.id}.role`,null);
    }
    if(un.type == "text") {
    type = "لوق"
    index = un.name
    mange.set(`protection_${message.guild.id}.log`,null);
    }
    }
    const embed = new MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setTitle(`**لقد تم ${toggle} ${type} : \`${index}\` بنجاح !**`)
    .setColor("RANDOM")
    .setFooter(`- Requested By: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
    message.lineReplyNoMention(embed);
}
module.exports.help = {
  name: 'set-other',
  description: 'تحديد رتبة للموثوقين وسجل الحماية',
  usage: ["set-other (on / off) (role / channel)"],
  args: true,
  owner: true,
  cooldown: 5
}