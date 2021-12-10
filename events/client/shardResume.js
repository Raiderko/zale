//here the event starts
const {
  Permissions, MessageEmbed
} = require("discord.js")
module.exports = (client, id, replayedEvents) => {
  const channeel = client.channels.cache.get(`918165955765485648`)
  channeel.send({embeds: [
    new MessageEmbed()
    .setTitle(`Client Logs | Shards`)
    .setDescription(`\`\`\`js\nShard #${id} Reconnected and resumed 💙\`\`\``)
    .setColor("RED")
  ]})
  client.logger(`Shard #${id} Resumed`.green)
}

