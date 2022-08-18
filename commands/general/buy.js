const { MessageEmbed } = require('discord.js');
const bot = require("../../config");
const db = require("quick.db");
const ms = require("ms")
const humanizeDuration = require('humanize-duration');
module.exports.run = async(message, args, client, prefix) => {
    db.set(`prime_${message.author.id}`, {
    "time": Date.now() + (1000 * 60 * 60 * 2)
    })
  message.lineReply(`Done For (${ms(1000 * 60 * 60 * 24)})`)
  
  /*
    var data = db.get(`prime_${message.author.id}`);
    if(data) return message.channel.send(`**لديك البوت بلفعل !**`);
    if (!args[0]) return message.channel.send(`**لشراء البوت يرجى كتابة ايدي السيرفر بعد الأمر \n > ${prefix}buy [server id]**`);
    let price = bot.price;
    let lastprice = price - price / (100 / 5);
    lastprice = Math.floor(lastprice);
    let owner = "857635328046661693";
    const er = await message.channel.send(`**قم بتحويل ${price} لـ <@${owner}>.\n\`\`\`#credits ${owner} ${price}\`\`\`**`);
    var get = db.get(`prime.servers`).filter(e => e === args[0])[0] || client.guilds.cache.get(args[0]);
    if(get) return message.channel.send('لقد تم شراء هذا البوت فعلا لهذا الخادم !.')
    const filter = c => c.content.includes(message.author.username)
    && c.content.includes(`<@!${owner}>`)
    && c.content.includes(lastprice.toString())
    && (c.author.id == '282859044593598464'
        || c.author.id === "567703512763334685");
    
    message.channel.awaitMessages(filter, {
      time: 60000 * 2,
      max: 1,
      errors: ['time']
    }).then(async (c) => {
    let servers = db.get(`prime.servers`) || [];
    servers.push(args[0])
    db.set(`prime.servers`,servers)
    db.set(`prime_${message.author.id}`, {
    "time": Date.now() + (1000 * 60 * 60 * 24 * 7)
    })
        er.edit(`✅ **تم الشراء البوت بنجاح لقد ارسلت رابط الدعوة لك في الخاص.**`);
        message.author.send(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`).catch(() => {
        return message.lineReply('**❌ خاصك مقفل لم اتمكن من ارسال الرابط, للحصول على الرابط اكتب !vip [رقم البوت] invite**');
       })
    }).catch(() => {
      er && er.delete();
    message.lineReply("**انتهى الوقت المسموح لتحويل**.");

    });*/
}

module.exports.help = {
  name: 'buy',
  deva: true,
  cooldown: 10
}