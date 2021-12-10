//here the event starts
const {
  Permissions, MessageEmbed
} = require("discord.js")
module.exports = (client, id) => {
  const channeel = client.channels.cache.get(`918165955765485648`)
  channeel.send({embeds: [
    new MessageEmbed()
    .setTitle(`Client Logs | Shards`)
    .setDescription(`\`\`\`js\nShard #${id} Reconnecting\`\`\`<a:loading:916748783470149703>`)
    .setColor("RED")
  ]})
  client.logger(`Shard #${id} Reconnecting`.brightMagenta)
}

