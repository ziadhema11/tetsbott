const { MessageEmbed, WebhookClient } = require("discord.js");
const mange = require("quick.db");
const disbut = require("discord-buttons");
const l_join = new WebhookClient(
  "899378148758667314",
  "hXKf_nnw92mzXg5OTjP6eWRqrqC1pLwSHdkSx9BRI8BaaxfbLnt9dz0IL1McWSg2NIVw"
);
module.exports = client => ({
  event: 'guildMemberAdd',
  run(user) {


      let button = new disbut.MessageButton()
      .setEmoji("898267203214905344")
      .setStyle ('url')
      .setLabel('Support')
      .setDisabled(false)
      .setURL('https://discord.gg/A38BZdUA4F');
      let to = new disbut.MessageActionRow()
      .addComponents([button]);

user.send(
``
).catch(console.error);


  }
});

