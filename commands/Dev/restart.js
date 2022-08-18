const inlinereply = require('discord-reply');
const { devs } = require("../../config.json"); 
module.exports.run = async(message, args, client) => {
  
  await message.channel.send('Success!');
  await message.react('✅');   

  process.exit(1);
}
module.exports.help = {
  name: 'restart',
  description: 'تحديث للبوت',
  cooldown: 10,
  devs: true
}