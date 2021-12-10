//here the event starts
const {
  Permissions, MessageEmbed
} = require("discord.js")
module.exports = (client, error, id) => {
  const channeel = client.channels.cache.get(`918165955765485648`)
  channeel.send({embeds: [
    new MessageEmbed()
    .setTitle(`Client Logs | Shards`)
    .setDescription(`\`\`\`js\nShard #${id} Errored\`\`\``)
    .setColor("RED")
  ]})
  client.logger(`Shard #${id} Errored`.brightRed)
}

