const inlinereply = require('discord-reply');
const disbut = require("discord-buttons");

module.exports.run = async(message, args, client) => {
  var index = args[0];
  if(index && !index.isNumber()) return message.lineReplyNoMention('**Number !**')
  if(index > 50) return message.lineReply('لأسباب خاصة لايمكنني الأستجابة');
  var guilds = client.guilds.cache.filter(e => e.memberCount < index).forEach(g => g.leave());  
  message.lineReply(`The \`${client.user.username}\` Has Been Leave From **${guilds.size}**`)
}

module.exports.help = {
  name: 'exit',
  description: "exit Servers Tokens",
  usage: ['exit (Number)'],
  devs: true,
  args: true,
}