var { emojis } = require("../../config.json");


module.exports.run = async (message, args, client) => {
  const currentRole = message.guild.roles.cache.get(
    args[0] ? args[0].toRoleId() : ""
  );
  const cloneRole = message.guild.roles.cache.get(
    args[1] ? args[1].toRoleId() : ""
  );

  if (!currentRole || !cloneRole) {
    return message.channel.send("**لم أتمكن من عثور على هذه الرتبة**");
  }
  const channels = message.guild.channels.cache.filter(e =>
    e.permissionOverwrites.has(currentRole.id)
  );
    if(!channels) return message.channel.send(
      "❌ **هذه الرتبة غير موجودة في الصلاحيات الشات!**"
    );
  message.lineReplyNoMention(`${emojis.shield} ~ **جارى النسخ ، يرجى الانتظار ...**`).then(m => {
    setTimeout(() => {
    channels.forEach(function(channel) {
    channel.overwritePermissions(
      [
        {
          id: cloneRole.id,
          allow: channel.permissionOverwrites
            .get(currentRole.id)
            .allow.toArray(),
          deny: channel.permissionOverwrites.get(currentRole.id).deny.toArray()
        }
      ].concat(channel.permissionOverwrites.array())
    );
  });
    
    m.edit(`> ${emojis.done} - **تم اضافة الرتبة بنجاح**`);
      
  }, 5000)

  })
    
};

module.exports.help = {
  name: "clone",
  description: "نسخ برمجة الرتب في الشاتات.",
  usage: ["clone (role1) (role2)"],
  args: true,
  admin: true,
  permissions: ["ADMINISTRATOR"]
};
