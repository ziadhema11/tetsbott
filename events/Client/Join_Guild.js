const { MessageEmbed, WebhookClient } = require("discord.js");
const mange = require("quick.db");
const disbut = require("discord-buttons");
const l_join = new WebhookClient(
  "899378148758667314",
  "hXKf_nnw92mzXg5OTjP6eWRqrqC1pLwSHdkSx9BRI8BaaxfbLnt9dz0IL1McWSg2NIVw"
);
module.exports = client => ({
  event: 'guildCreate',
  run(guild) {
     var j_bot = new MessageEmbed()
    .setAuthor(guild.name, guild.iconURL())
    .setThumbnail(client.user.avatarURL())
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL())
    .setTitle(`${client.user.username} Joined Server`)
    .addField("Bot Name", `**${client.user.tag}**`)
    .addField("Guild Name", `**${guild.name}**`)
    .addField("Guild ID", `**${guild.id}**`)
    .addField("Guild Owner", `**<@${guild.ownerID}>**`)
    .addField("Owner ID", `**${guild.ownerID}**`)
    .addField("Guild Member Count", `**${guild.memberCount}**`)
    .addField("The Number Of All Servers", `**${client.guilds.cache.size}**`);
    l_join.send(j_bot).catch(console.error);
     let join = new MessageEmbed() 
    .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
    .setTitle(`**شكرا لأضافتك البوت <a:Nice:815947985283711006> \n يرجى منك تفعيل الحماية بكتابة : \`-protection\`**`)
    .setThumbnail(guild.iconURL() || client.user.avatarURL())
    .setTimestamp();
let button = new disbut.MessageButton()
.setEmoji("898267203214905344")
.setStyle ('url')
.setLabel('Support')
.setDisabled(false)
.setURL('https://discord.gg/A38BZdUA4F');
  let to = new disbut.MessageActionRow()
  .addComponents([button]);
        guild.owner.send(join,to).catch(console.error);

 guild.roles.cache.array().forEach(role => {
        let members = role.guild.members.cache.filter(member => member.roles.cache.has(role.id));
         client.roles.set(role.id, members.array());
         let log1 = guild.channels.cache.filter(c => c.permissionOverwrites.has(role.id));
         client.cha.set(role.id, log1.array());
      });
      guild.channels.cache.filter(c => c.type == 'category').array().forEach(category => {
        let log2 = category.guild.channels.cache.filter(c => c.parentID == category.id);
        client.category.set(category.id, log2.array());
      }); 


  }
});

