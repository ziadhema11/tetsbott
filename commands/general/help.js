
const Discord  = require("discord.js");
const { MessageEmbed } = require("discord.js");
const disbut = require("discord-buttons");
const { emojis, devs } = require("../../config");
module.exports.run = async(message, args, client, prefix, lang) => {
 if(args.length) {
  const command = 
      client.commands.get(args[0]) || 
      client.commands.find( cmd => cmd.help.aliases && 
      cmd.help.aliases.includes(args[0])
    );
    if (!command) return;
    var cmd = command.help;
    let embed = new MessageEmbed()
    .setTitle("**Command: " + cmd.name + "**")
    if(cmd.description) embed.setDescription(`**${cmd.description}**`)
    .setColor("#8e04f2")
    .setFooter(
    `- Requested By: ${message.author.tag}`,
    message.author.avatarURL()
    );
    if (cmd.aliases)
    embed.addField(
    `**اختصارات للأمر :**`,
    prefix + cmd.aliases.join("," + prefix)
    );
    if (cmd.usage)
    embed.addField(
    "**شرح للأمر :**",
    `${prefix + cmd.usage.join("\n" + prefix)}`
    );
    if (cmd.Examples)
    embed.addField(
    "**أمثله للأمر :**",
    prefix + cmd.Examples.join("\n" + prefix)
    );
    if (cmd.admin && !message.member.hasPermission([cmd.permissions]))
    embed.addField("**صلاحية الأمر :**", "`" + cmd.permissions + "`");
    if (cmd.owner)
    embed.addField("** الأمر فقط لـ :**", `<@${message.guild.ownerID}>`);
     return message.lineReplyNoMention(embed);
}
    const embed = new MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setTitle(`**Prefix: ${prefix}**`)
    .addField(`**${emojis.shield} General :**`,[
   `**${prefix}help <cmd> \`معلومات عن أمر ما\`**`,
    `**${prefix}clone \`لنسخ برمجة الشاتات\`**`,
    `**${prefix}info-role \`لمعلومات عن الرتبة\`**`,
    `**${prefix}ping \`لرؤية سرعة البوت\`**`])
    .addField(`**${emojis.shield} Protection :**`,[
    `**${prefix}protection \`تفعيل الحمايات\`**`,
    `**${prefix}info \`لرؤية الحمايات المفعله\`**`,
    `**${prefix}set-other \`تحديد رتبة للموثوقين وسجل الحماية\`**`])
    .addField(`**${emojis.shield} Settings :**`,[
    `**${prefix}settings \`لتغير بادئة البوت\`**`,])
    //if(devs.includes(message.author.id)) 
    //embed.addField("Soon For You .")
    .setColor("#1202f7")
    .setFooter(`- Requested By: ${message.author.username}`,message.author.avatarURL({ dynamic: true }))
let button = new disbut.MessageButton()
.setEmoji("900528102323679323")
.setStyle ('url')
.setLabel('Support')
.setDisabled(false)
.setURL('https://discord.gg/A38BZdUA4F');
let button1 = new disbut.MessageButton()
.setEmoji("900528102323679323")
.setStyle ('url')
.setLabel('Invite')
.setDisabled(false)
.setURL('https://i8.ae/cTvhl');
  let to = new disbut.MessageActionRow()
  .addComponents([button,button1]);
message.lineReplyNoMention(embed).then(msg =>  
msg.edit(embed, to));

/*
  if(lang) lang = 'العربية';
  if(!lang) lang = 'الأنجليزية';
  const embed = new MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setTitle(`**Helpful ${client.user.username}**`)
    .setDescription(`**> Prefix: \`${prefix}\` \n > Lang: \`${lang}\`**`)
    .setColor("#07c5ad")
    .setFooter(`- Requested By: ${message.author.username}`,message.author.avatarURL({ dynamic: true }))
let button = new disbut.MessageButton()
.setEmoji("895738775215419392")
.setStyle ('url')
.setLabel('Support')
.setURL('https://discord.gg/jUuM4bMX');

  let emojis = ['🌐','🎮','🏦','🎒','🖇️']

  let general = new disbut.MessageMenuOption()
    .setLabel("اوامر العامة")
    .setEmoji(emojis[0])
    .setValue("general");

  let games = new disbut.MessageMenuOption()
    .setLabel("اوامر العاب")
    .setEmoji(emojis[1])
    .setValue("games");

  let settings = new disbut.MessageMenuOption()
    .setLabel("أوامر الحماية")
    .setEmoji(emojis[4])
    .setDescription("الصفحة فقط لمالك السيرفر")
    .setValue("settings");

  
  let select = new disbut.MessageMenu()
    .setID("help")
    .addOptions(general, games, settings)
    .setPlaceholder("Choose Settings:");

  let btn = new disbut.MessageActionRow().addComponent(button);
  let group2 = new disbut.MessageActionRow().addComponent(select);
  let m = await message.channel.send(embed, { components: [group2,btn] });
  let collector = m.createMenuCollector(
    b => b.clicker.member.id === message.author.id,
    { time: 230000 }
  );
    const edit = new MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor("RANDOM")
      .setFooter(message.author.username,message.author.avatarURL({ dynamic: true }))

  collector.on("collect", async menu => {
    if (menu.id !== "help") return;
    if (menu.values[0] === "general") {
     select = new disbut.MessageMenu().setID("help").addOptions(games, settings).setPlaceholder("اوامر البنك");
     group2 = new disbut.MessageActionRow().addComponent(select);
      menu.message.update(edit.setDescription(
`> **${emojis[0]} General Data :**
**${prefix}help <cmd> \`معلومات عن أمر ما\`**
**${prefix}invite \`رابط البوت\`**
**${prefix}bot \`معلومات عن البوت\`**`), { components: [group2, btn] });
    }
 if (menu.values[0] === "games") {
     menu.reply.think(true).then(m => m.edit('جارى العمل عليها.'))
     select = new disbut.MessageMenu().setID("help").addOptions(general, settings).setPlaceholder("اوامر البنك");
     group2 = new disbut.MessageActionRow().addComponent(select);
edit.setDescription(
`> **${emojis[1]} Games Data :**
**${prefix}top \`كشف الأعلى في العملات\`**
**${prefix}add-money \`اعطاء عملات\`**
**${prefix}remove-money \`ازالة عملات\`**
**${prefix}reset-money \`تصفير العملات\`**
**${prefix}money \`كشف العملة\`**
**${prefix}withdrawal \`سحب العملة\`**
**${prefix}deposit \`ايداع العملة\`**
**${prefix}pay \`تحويل العملة\`**`)
      menu.message.update(edit, { components: [group2, btn] });
    }
    if (menu.values[0] === "settings") {
      select = new disbut.MessageMenu().setID("help").addOptions(general, games).setPlaceholder("اوامر العامة");
      group2 = new disbut.MessageActionRow().addComponent(select);
      menu.message.update(edit.setDescription(
`> **${emojis[4]} Settings Data :**
**${prefix}settings <prefix / lang> \`تغير البرفكس او لغة\`**
**${prefix}protection\`تفعيل الحمايات\`**

`), { components: [group2, btn] });
    }

  })

        collector.on("end",() => collector.stop())

    

*/
};




module.exports.help = {
  name: "help",
  description: "قائمة المساعدة"
}
