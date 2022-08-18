const inlinereply = require('discord-reply');
const { devs} = require("../../config.json");
module.exports.run = async(message, args, client) => {
  
    message.delete();
    message.channel.send(args.join(' '))
  
}

module.exports.help = {
  name: 'say',
  description: 'التحدث بصفة البوت',
  cooldown: 10,
  args: true,
  devs: true
}