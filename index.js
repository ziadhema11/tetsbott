const { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client();
const { TOKEN, owners, system, emojis, prefix } = require("./config");
const { readdirSync } = require("fs");
client.commands = new Collection();
const cooldowns = new Collection();
const Enmap = require("enmap");
const { MessageAttachment } = require("discord.js");
const database = require("quick.db");
const inlinereply = require("discord-reply");
const moment = require("moment");
const ms = require("ms");
const fs = require("fs");
require("./src/defineProperties");
const disbut = require("discord-buttons");
disbut(client);
client.on('error', console.error);
client.on('warn', console.warn);

const commandsFolders = readdirSync("commands").filter(
  folder => !folder.includes(".")
);

for (let commandFolder of commandsFolders) {
  const files = readdirSync("commands/" + commandFolder).filter(file =>
    file.endsWith(".js")
  );
  for (let commandFile of files) {
    let cmd = require(`./commands/${commandFolder}/${commandFile}`);
    client.commands.set(cmd.help.name, cmd);
  }
}

const events = readdirSync('events');
events.filter(e => !e.endsWith('.js')).forEach(folder => {
  readdirSync('events/' + folder).forEach(event => {
    event = require(`./events/${folder}/${event}`)(client);
    if (event.once !== false) client.on(event.event, event.run);
  });
});

const protection = readdirSync('protection');
protection.filter(e => !e.endsWith('.js')).forEach(folder => {
  readdirSync('protection/' + folder).forEach(event => {
    event = require(`./protection/${folder}/${event}`)(client);
    if (event.once !== false) client.on(event.event, event.run);
  });
});


client.roles = new Collection();
client.cha = new Collection();
client.category = new Collection();
client.prefix = prefix;
// ------------------------------------------------------------------------------------------------------------------ //

client.login(TOKEN);
// ------------------------------------------------------------------------------------------------------------------ //

///


/*
// ------------------------------------------------------------------------------------------------------------------ //
client.on("guildMemberRemove", member=>{
  let nickname = member.nickname || 'مخالف دخل ودخل';
  var role = member.guild.roles.cache.get("840341488713072681");
  if(!role) return;
  if(!member.roles.cache.has(role.id)) return;
  console.log(member.nickname)
  database.set(`blacklist_${member.guild.id}_${member.id}`,{nickname:nickname})
});
// ------------------------------------------------------------------------------------------------------------------ //
client.on("guildMemberAdd", member=>{
  var role = member.guild.roles.cache.get("840341488713072681");
  if(!role) return;
  var data = database.get(`blacklist_${member.guild.id}_${member.id}`)
  if(!data) return;
  if(data) {
  console.log('بلع مخالف')

     member.setNickname(data.nickname);
     let sendlog = new MessageEmbed() 
    .setAuthor(member.guild.name, member.guild.iconURL({ dynamic: true }))
    .setTitle(system.nameT)
    .setDescription(`**${emojis.reason} | دخول عضو مخالف | ${emojis.reason}**`)  
    .addField(`**${emojis.admins} | العضو :**`, `**<@${member.id}>**`)
    .addField(`**${emojis.member} | الاسم المضاف :**`, `**\`مخالف طلع ودخل .\`**`)
    .setThumbnail(client.user.avatarURL())
    .setTimestamp();
  
      var log = member.guild.channels.cache.get('895726738926075934');
      var channel = member.guild.channels.cache.get("840386424896880640");

      if (log) {
       log.createWebhook(member.guild.member(client.user).nickname ? member.guild.member(client.user).nickname  : client.user.username, { avatar: client.user.avatarURL()}).then( async  hook=>{

       await hook.send(sendlog).then(() => hook.send(system.line));
       await hook.delete();

});
      }
      channel.send(`\`\`\`DREAM CITY VIOLATORS NETWORK | شبكة دريم ستي للمخالفين\`\`\`

** منشن المخالف | <@${member.id}>

سبب السجن | مخالف طلع ودخل

ملاحظة : يجب ارفاق صورة او مقطع دليل القرار لايشمل الاونرز **`).then(() => channel.send(system.line));
      
    setTimeout(() => {
  member.roles.set([]).then(() => 
   {
  member.roles.add(role)
   });
		}, ms("5s"));
  mange.delete(`blacklist_${member.guild.id}_${member.id}`)
}
});
// ------------------------------------------------------------------------------------------------------------------ //
*/

// التفعيل

// ------------------------------------------------------------------------------------------------------------------ //



client.on("message", message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.channel.id !== "895442545524494346") return;
  let args = message.content.split(" ").join(" ");
  if (args.includes("https://")) return message.delete();
  if (args.includes("discord.gg/")) return message.delete();

  message.delete();
  let fel = new MessageEmbed()
    .setColor("#f1cd07")
    .setAuthor(message.author.username, message.author.avatarURL())
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setDescription(args)
    .setFooter(message.channel.name, message.guild.iconURL());
  message.channel.send(fel).then(m => {
      m.react("857616784056123435");
      m.react("857616786865389598");
    })
    .then(m => message.channel.send(system.line));
});
/*
client.on("guildMemberAdd", async member => {
  let moment = require("moment"),
    moment2 = require("moment-duration-format"),
    date = moment.duration(new Date() - member.user.createdAt).format("d");

  if (date < 7) {
    var role = member.guild.roles.cache.get("863508073598812190");
    if (!role) return;

    member.setNickname("وهمي");
    let sendlog = new MessageEmbed()
      .setAuthor(member.guild.name, member.guild.iconURL({ dynamic: true }))
      .setTitle(system.nameT)
      .setDescription(`**${emojis.reason} | دخول عضو وهمي | ${emojis.reason}**`)
      .addField(`**${emojis.admins} | العضو :**`, `**<@${member.id}>**`)
      .addField(`**${emojis.member} | الاسم المضاف :**`, `**\`وهمي .\`**`)
      .setThumbnail(botid.user.avatarURL())
      .setTimestamp();

    var channel = member.guild.channels.cache.find(
      r => r.name === logo.blacklistlog
    );
    if (channel) {
      channel
        .createWebhook(
          member.guild.member(botid.user).nickname
            ? member.guild.member(botid.user).nickname
            : botid.user.username,
          { avatar: botid.user.avatarURL() }
        )
        .then(async hook => {
          await hook.send(sendlog).then(() => hook.send(system.line));
          await hook.delete();
        });
    }
    setTimeout(() => {
      console.log("hi .");
      member.roles.set([]).then(() => {
        member.roles.add(role);
      });
    }, ms("5s"));
  }
});

client.on("message", message => {
  if (message.content === prefix + "emojis") {
    //message.guild.emojis.create(`https://media.discordapp.net/attachments/876212336606720111/876985977049079878/171_375AF63.png`, `1FIRE`)

    var data = db(`${message.guild.id}-${message.author.id}`);

    data.check({ userID: message.author.id, money: 0, bank: 0 });
    data.setProp("bank", 1500);
    message.channel.send(
      `**Successfully Added The Emoji ✅ \`1500\` For ${message.author}**`
    );
  }
});

botid.on("message", message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.startsWith(prefix + "addall")) {
    if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "** ${n} - Your Must Have a `Administartor` permission**"
      );

    var role = message.mentions.roles.first();
    if (!role) return message.channel.send(`**$ error\n ${prefix}addall rolename**`);
    var role1 = message.guild.roles.cache.find(r =>
      r.name.startsWith(
        message.content
          .split(" ")
          .slice(2)
          .join(" ")
      )
    );
    if (!role1)
      return message.channel.send(
        `** error\n ${prefix}addall @role rolename**`
      );
    let user = message.guild.members.cache
      .filter(m => m.roles.cache.get(role.id))
      .forEach(m => {
        m.roles.add(role1);
      });

    message.channel.send(
      `__**${emojis.done} | لقد تم اعطاء جميع \n${role} \n رتبة \n ${role1}**__`
    );
  }
});
*/


client.on("message", message => {
  if(message.channel.id === "899101189692596244") {
    message.react("<a:5_:807767112818884680>")
  }
})
