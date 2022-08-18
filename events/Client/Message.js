const bot = require("../../config");
const { Collection, MessageEmbed, WebhookClient } = require("discord.js");
const mange = require("quick.db");
const cooldowns = new Collection();
 const logcmd = new WebhookClient(
    "899371153943056444",
    "nUTiIBTTOPz_8HZ8q6ZA26hcIQHEudHTsQLE1LTRJ_2H4mNN7zFvIm10p0nX-9tV6l9f"
  );
module.exports = client => ({
  event: 'message',
  run(message) {
  if (message.author.bot || !message.guild) return;
  var data = mange.get(`settings_${message.guild.id}`);
  if(!data) mange.set(`settings_${message.guild.id}`,{
  prefix: bot.prefix,
  lang: bot.prefix
  });
    var se = mange.get(`protection_${message.guild.id}`);
    if(!se) mange.set(`protection_${message.guild.id}`, {
    "role":null,
    "log": null,
    "antiroles": {
    toggle: "off",
    action: null
    },
    "antichannels":{
    toggle: "off",
    action: null
    },
    "antibots":{
    toggle: "off",
    actionBot: null,
    action: null
    },
    "antiprune":{
    toggle: "off",
    action: null
    },
    "antilink":{
    toggle: "off",
    action: null
    },
    })
  let lang;
  let prefix = mange.get(`settings_${message.guild.id}.prefix`);
  let settings = mange.get(`settings_${message.guild.id}.lang`);
  if(settings == 'ar') lang = true;
  if(settings == 'en') lang = false;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  var commandName = args.shift();
  if (!message.content.startsWith(prefix)) return;
  const command = 
      client.commands.get(commandName) || 
      client.commands.find( cmd => cmd.help.aliases && 
      cmd.help.aliases.includes(commandName)
    );
    if (!command) return;
    var cmd = command.help;

   let loghook = new MessageEmbed()
      .setTitle("**Log Commands:** ")
      .addField(
        "**Member:**",
        `\`${message.author.tag}\` | <@${message.author.id}>`
      )
      .addField(
        "**Server:**",
        `\`${message.guild.name}\` | ${message.guild.id}`
      )
      .addField("**Member Count:**", `\`${message.guild.memberCount}\``)
      .addField("**Prefix:**", `\`${prefix}\``)
      .addField("**Command:**", `\`${commandName} ${args.join(' ')}\``)
      .addField(
        "**Channel:**",
        `\`${message.channel.name}\` | ${message.channel.id}`
      )
      .setThumbnail(client.user.avatarURL())
      .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .setFooter(message.author.username, message.author.avatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("RANDOM");

    logcmd.send(loghook);
    let embed = new MessageEmbed()
    .setTitle("**Command: " + cmd.name + "**")
    if(cmd.description) embed.setDescription(`**${cmd.description}**`)
    
    .setFooter(
    `- Requested By: ${message.author.tag}`,
    message.author.avatarURL()
    );
    if (cmd.aliases)
    embed.addField(
    `**Command Aliases:**`,
    prefix + cmd.aliases.join("," + prefix)
    );
    if (cmd.usage)
    embed.addField(
    "**Usage Command:**",
    `${prefix + cmd.usage.join("\n" + prefix)}`
    );
    if (cmd.Examples)
    embed.addField(
    "**Examble Command:**",
    prefix + cmd.Examples.join("\n" + prefix)
    );
    if (cmd.admin && !message.member.hasPermission([cmd.permissions]))
    embed.addField("**صلاحية الأمر :**", "`" + cmd.permissions + "`");
    if (cmd.owner)
    embed.addField("** الأمر فقط لـ :**", `<@${message.guild.ownerID}>`);
    if (cmd.args && !args.length) return message.channel.send(embed);
    if (command.help.admin && !message.member.hasPermission(command.help.permissions))
    return;
    if (cmd.devs && !bot.devs.includes(message.author.id)) return;
    if (cmd.owner && message.author.id !== message.guild.ownerID) 
    return message.lineReply('**الأمر فقط لمالك السيرفر !**')

  if (!cooldowns.has(cmd.name)) {
    cooldowns.set(cmd.name, new Collection());
  }
  const now = Date.now();
  const timestamps = cooldowns.get(cmd.name);
  const cooldownAmount = (cmd.cooldown || 3) * 1000;
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel
        .send(
          `**${bot.emojis.err} - Please Wiat \`${timeLeft.toFixed()}\` Secs !**`
        )
        .then(msg => {
          msg.delete({ timeout: 2500 });
        });
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.run(message, args, client, prefix, lang);
  } catch(err) {
    return console.log(err)
  }
  }
});