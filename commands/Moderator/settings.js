const { MessageEmbed, MessageAttachment } = require("discord.js");
const { emojis } = require("../../config.json");
const mange = require("quick.db");
const inlinereply = require("discord-reply");
module.exports.run = async (message, args, client, prefix, lang) => {
  if (args[0] !== "prefix")
    return message.lineReplyNoMention(`${prefix}settings <prefix / lang>`);
  let newSet = args[1];
  if (args[0] == "prefix") {
    if (!newSet) newSet = "-";
    if (Number(newSet))
      return message.lineReplyNoMention(`> **${emojis.err} فقط كتابة !**`);
    if (newSet.length > 1)
      return message.lineReplyNoMention(`> **${emojis.err} فقط حرف واحد !**`);
    mange.set(`settings_${message.guild.id}.prefix`, newSet);
  }
  if (args[0] == "prefix") args[0] = "البرفكس";
  const embed = new MessageEmbed()
    .setTitle(`> **${emojis.done} لقد تم تغير ${args[0]} الى : \`${newSet}\`**`)
    .setColor("RANDOM")
  message.lineReplyNoMention(embed);

};

module.exports.help = {
  name: "settings",
  description: "تغير البرفكس",
  usage: ["settings prefix"],
  args: true,
  admin: true,
  permissions: ["ADMINISTRATOR"],
  cooldown: 5
};
