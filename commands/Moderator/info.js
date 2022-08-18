const { MessageEmbed, MessageAttachment } = require('discord.js');
const config = require("../../config.json");
const mange = require("quick.db");
const inlinereply = require('discord-reply');
const index = ["antiroles","antichannels","antibots","antiprune","antilink","antiserver","backup"];
module.exports.run = async(message, args, client, prefix, lang) => {
    var data = mange.get(`protection_${message.guild.id}`);
    if(!data) return message.lineReplyNoMention('لم تقم بتفعيل الحمايات !');
    let role;
    let log;
    if(data) {
    if (!data.role && data.role == null) role = `\`معطله\` ${config.emojis.off[0]}`;
    var rank = message.guild.roles.cache.get(data.role)
    if(rank) role = `${rank}`
    if(!rank) mange.delete(`protection_${message.guild.id}.role`)
    if (!data.log && data.log == null) log = `\`معطله\` ${config.emojis.off[0]}`;
    var channel = message.guild.channels.cache.get(data.log)
    if(channel) log = `${channel}`
    if(!channel) mange.delete(`protection_${message.guild.id}.log`)
    index.forEach(t => {
    if (data[t].toggle == "on") data[t].toggle = `\`مفعله\` ${config.emojis.on[0]}`
    if (data[t].toggle == "off") data[t].toggle = `\`معطله\` ${config.emojis.off[0]}`
    if (data[t].action == "ban") data[t].action = 'حظر'
    if (data[t].action == "kick") data[t].action = 'طرد'
    if (data[t].action == "removePreUser") data[t].action = 'ازالة صلاحيات المستخدم'
    if (data[t].action == "removeRoles") data[t].action = 'سحب رتب المستخدم';
    if (data[t].actionBot == "removePreBot") data[t].actionBot = 'ازالة صلاحيات البوت'
    if (data[t].actionBot == "kick") data[t].actionBot = 'طرد البوت'
    if (data[t].actionBot == "ban") data[t].actionBot = 'حظر البوت'
    })
//
    const embed = new MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setTitle(`**${config.emojis.shield} | الحمايات**`)
    .addField(`> ${config.emojis.role} **حماية الرتب**`,[
    `**حالة الحماية : ${data.antiroles.toggle}**`,
    `**الأجراء المتخذ : \`${data.antiroles.action || 'لم يتم التحديد'}\`**`, 
    `> ${config.emojis.channel} **حماية الشاتات**`,
    `**حالة الحماية : ${data.antichannels.toggle}**`,
    `**الأجراء المتخذ : \`${data.antichannels.action || 'لم يتم التحديد'}\`**`,  
    `> ${config.emojis.bot} **حماية البوتات**`,
    `**حالة الحماية : ${data.antibots.toggle}**`,
    `**الأجراء المتخذ : \`${data.antibots.action || 'لم يتم التحديد'}\`**`, 
    `**الأجراء المتخذ للبوت : \`${data.antibots.actionBot || 'لم يتم التحديد'}\`**`, 
    `> ${config.emojis.reason[0]} **حماية البرون**`,
    `**حالة الحماية : ${data.antiprune.toggle}**`,
    `**الأجراء المتخذ : \`${data.antiprune.action || 'لم يتم التحديد'}\`**`, 
     `> ${config.emojis.any} **أخرى**`,
    `**رتبة الموثوقين : ${role}**`,
    `**لوق الحماية : ${channel}**`
    ])
    .setColor("RANDOM")
    .setFooter(`- Requested By: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
       message.lineReplyNoMention(embed)
 
   }

   
    }

module.exports.help = {
  name: 'info',
  description: 'اعدادات البوت',
  cooldown: 1,
  admin: true,
  permissions: ["ADMINISTRATOR"]
}