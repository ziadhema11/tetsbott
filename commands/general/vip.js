const { MessageEmbed } = require('discord.js');
const bot = require("../../config");
const db = require("quick.db");
const humanizeDuration = require('humanize-duration');
module.exports.run = async(message, args, client, prefix) => {
    var data = db.get(`prime_${message.author.id}`);
    if(!data) return message.channel.send(`**لاتمتلك البوت !.**`);
        data = data.time
      message.channel.send(humanizeDuration(data - Date.now(), { language: 'ar' , round: true, units: ['y', 'mo', 'w', 'd', 'h', 'm'] }))
}

module.exports.help = {
  name: 'vip',
  devs: true,
  cooldown: 1
}