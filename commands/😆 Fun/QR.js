const {
    MessageEmbed,
    MessageButton,
    MessageActionRow
  } = require("discord.js")
  const config = require(`${process.cwd()}/botconfig/config.json`);
  var ee = require(`${process.cwd()}/botconfig/embed.json`);
  const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
  const {
    handlemsg
  } = require(`${process.cwd()}/handlers/functions`)
  module.exports = {
    name: "qr",
    category: "😆 Fun",
    aliases: ["add"],
    usage: "qr <link>",
    description: "creates a qr code for a link",
    run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
        const link = args.slice(0).join(" ");
        if(!link) return message.reply(`please give me a link!`)

        const url = `http://api.qrserver.com/v1/create-qr-code/?data=${link}&size=200x200`
        
        const embed = new MessageEmbed()
        
          
          .setImage(`${url}`)
          .setColor("PURPLE"
)
        
        message.reply({
          embeds: [embed]
        })
    }
}