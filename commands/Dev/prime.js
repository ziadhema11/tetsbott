const { MessageEmbed, MessageAttachment } = require('discord.js');
const bot = require("../../config.json");
const mange = require("quick.db");
const inlinereply = require('discord-reply');
module.exports.run = async(message, args, client, prefix, lang) => {
    if(args[0] !== "add" && args[0] !== "remove" && args[0] !== "find") {
     var data = mange.get(`prime.servers`)
     if(!data) return;
    let servers = []
    let guild = client.guilds.cache.map(server =>
    `${server.name} | ${server.id}`
    )
    message.channel.send(guild.join("\n") + " \n **Data Bot:** \n" + data.join('\n'))    
    }
    var data = mange.get(`prime`);
    if(!data) mange.set(`prime`,{
    servers:[]
    })
    let servers = mange.get(`prime.servers`) || [];
    let server = args[1];
    if(args[0] == "add") { 
    if(!Number(server)) return message.lineReplyNoMention(`> **${bot.emojis.err} فقط ارقام !**`)
    if(server.length < 5) return message.lineReplyNoMention(`> **${bot.emojis.err} يرجى كتاية ايدي السيرفر بكشل صحيح !**`)
    servers.push(server)
    mange.set(`prime.servers`,servers)
    return message.channel.send('**لقد تم اعطاء النسخة بنجاح.**')
    }
    if(args[0] == "remove") {
    if(!Number(server)) return message.lineReplyNoMention(`> **${bot.emojis.err} فقط ارقام !**`)
    if(server.length < 5) return message.lineReplyNoMention(`> **${bot.emojis.err} يرجى كتاية ايدي السيرفر بكشل صحيح !**`)
    var get = data.servers.filter(e => e === server)[0];
    var has = client.guilds.cache.get(server)
    if(!get) return message.channel.send('لم اتمكن من العثور على السيرفر')
    var newS = data.servers.filter(e => e != server);
    if(get) mange.set(`prime.servers`,newS)
    if(has) has.leave()
    return message.channel.send('تم ازالة النسخة من السيرفر بنجاح')
    }
    if(args[0] == "find") {
    if(!Number(server)) return message.lineReplyNoMention(`> **${bot.emojis.err} فقط ارقام !**`)
    if(server.length < 5) return message.lineReplyNoMention(`> **${bot.emojis.err} يرجى كتاية ايدي السيرفر بكشل صحيح !**`)
    var get = data.servers.filter(e => e === server)[0];
    if(!get) return message.channel.send('لم اتمكن من العثور على السيرفر')
    if(get) message.channel.send('تم التحقق من السيرفر')
    }
    /*
    
    if(args[0] == "remove") {
    if(!['ar','en'].includes(newSet)) return;
    if(Number(newSet)) return;
    mange.set(`settings_${message.guild.id}.lang`, newSet)
    }

    if(args[0] == 'prefix') args[0] = 'البرفكس'
    if(args[0] == 'lang') args[0] = 'اللغة'
    if(newSet == 'ar') newSet = 'العربية'
    if(newSet == 'en') newSet = 'الأنجليزية'
    message.lineReplyNoMention(`> **${bot.emojis.done} لقد تم تغير ${args[0]} الى : \`${newSet}\`**`)
    

    message.lineReplyNoMention(`**${bot.emojis.done} Done Set ${args[0]} to : \`${newSet}\`**`)
    */
    }

module.exports.help = {
  //name: 'prime',
  description: 'اعدادات البوت',
  usage: ['prime','prime (add / remove / find)'],
  args: true,
  devs: true,
  cooldown: 1
}