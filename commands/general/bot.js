const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const disbut = require("discord-buttons");
var host = require("../../config.json");
require('moment-duration-format');

module.exports.run = async (message, args, client, prefix, lang) => {
  const status = {
    online: "<:online:887018609321340978>",
    offline: "<:offline:887018610873237504>",
    dnd: "<:dnd:887018607668777061>",
    idle: "<:idle:887018606062370886>"
  };

  const dev = host.devs.forEach(d => client.users.cache.get(d));
  let embed = new MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setThumbnail(client.user.avatarURL({ dynamic: true }))
    .addField(`Info: ${client.user.username}`, [
      `**Name: \`${client.user.tag}\`**`,
      `**ID: \`${client.user.id}\`**`,
      `**Created At: \`${moment(client.user.createdTimestamp).format("DD/MM/YYYY")}\n ${moment(client.user.createdTimestamp).fromNow()}\`**`,
      `**Prefix:\`${prefix}\`**`,
      `**Lang: \`${lang || "العربية"}\`**`,
      `**Guilds Count: \`${client.guilds.cache.size}\`**`,
      `**Users Count: \`${client.users.cache.size}\`**`,
      `**Online Since: \`${moment.duration(client.uptime).format("D [days], H[hrs], m[mins], s[secs]")}\`**`,
      `**Bot Status: \`${client.user.presence.status +
        "`" +
        " " +
        status[client.user.presence.status]}**`,
      `**Developers: \n <@${host.devs.join("> \n <@")}>**`
    ])

    .setFooter(
      `- Requested By: ${message.author.username}`,
      message.author.avatarURL({ dynamic: true })
    );
  //
  let button = new disbut.MessageButton()
    .setEmoji("898267203214905344")
    .setStyle("url")
    .setLabel("Support")
    .setDisabled(false)
    .setURL("https://discord.gg/A38BZdUA4F");
  let button1 = new disbut.MessageButton()
    .setEmoji("898267203214905344")
    .setStyle("url")
    .setLabel("Invite")
    .setDisabled(false)
    .setURL("https://i8.ae/cTvhl");
  let to = new disbut.MessageActionRow()
  .addComponents([button, button1]);
  //
  message.lineReplyNoMention(embed).then(m => {
    m.edit(embed, to)
  })
};

module.exports.help = {
  name: "bot",
  description: "معلومات عن البوت"
};
