//here the event starts
const {
  Permissions, MessageEmbed
} = require("discord.js")
module.exports = (client, error) => {
  const channeel = client.channels.cache.get(`918165955765485648`)
  channeel.send({embeds: [
    new MessageEmbed()
    .setTitle(`Client Logs | Errors`)
    .setDescription(`\`\`\`js\n${String(error)}\`\`\``)
    .setColor("RED")
  ]})
  console.log(String(error).red.dim);
}

