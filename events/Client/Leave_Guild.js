const {MessageEmbed,WebhookClient} = require("discord.js");
const mange = require("quick.db");
const disbut = require("discord-buttons");
const join = new WebhookClient(
  "899376824327475201",
  "i7Y-SPl6CHsIFZwifbsZ8IhhRXD1klsm22aGNin1RQKbZwFFDl5y0LCxLx2z3ehCIghu"
);
module.exports = client => ({
  event: 'guildDelete',
  run(guild) {

     var j_bot = new MessageEmbed()
    .setAuthor(guild.name, guild.iconURL())
    .setThumbnail(client.user.avatarURL())
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL())
    .setTitle(`${client.user.username} Leaved Server`)
    .addField("Bot Name", `**${client.user.tag}**`)
    .addField("Guild Name", `**${guild.name}**`)
    .addField("Guild ID", `**${guild.id}**`)
    .addField("Guild Owner", `**<@${guild.ownerID}>**`)
    .addField("Owner ID", `**${guild.ownerID}**`)
    .addField("Guild Member Count", `**${guild.memberCount}**`)
    .addField("The Number Of All Servers", `**${client.guilds.cache.size}**`);
    join.send(j_bot).catch(console.error);

  }
});

