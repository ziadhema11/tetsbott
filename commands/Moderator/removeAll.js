const inlinereply = require('discord-reply');
module.exports.run = async (message, args, client) => {
    let done = 0;
    let err = 0;
    message.lineReplyNoMention("**جارى ازالة اسماء الاعضاء.**").then(msg => {
   var users = message.guild.members.cache.some(member => {
   if(!member.nickname) return;
   if(!member.manageable) return;
       member.setNickname('',[`By: ${message.author.tag}`]).then(done++)
 });
   msg.edit(`*Done: ${done}`);
});
};

module.exports.help = {
  name: "removeAll",
  devs: true,
  permissions: ["ADMINISTRATOR"]
};
