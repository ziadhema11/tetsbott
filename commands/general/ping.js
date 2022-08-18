module.exports.run = async(message, args, client) => {
  
  message.lineReplyNoMention("** Pong !!**").then(msg => {
    const png = msg.createdTimestamp - message.createdTimestamp
    const ws = client.ws.ping
    msg.edit(`\`\`\`css\nBot Ping: ${ws}\nDiscord API ${png}\`\`\``, {timeput: 500})
  })
  
}

module.exports.help = {
  name: "ping",
  description: "Display speed of the bot.",
  usage: ['p']
}