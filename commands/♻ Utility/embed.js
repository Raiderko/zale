const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = { //if [OPTIONAL] it means, you don't need to type it!
  name: "embed", //the Command Name [REQUIRED]
  category: "Administration", //the Command Category [OPTIONAL]
  aliases: [], //the command aliases [OPTIONAL]
  cooldown: 2, //the Command Cooldown (Default in /botconfig/settings.json) [OPTIONAL]
  usage: "embed <Title> ++ <Description>", //the Command usage [OPTIONAL]
  description: "Resends your Text in an embed", //the command description [OPTIONAL]
  
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    try{
      let title = args[0];
      let desc = args.slice(1).join(" ")
      message.reply({embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(title && desc ? title.substr(0, 256) : "")
        .setDescription(desc ? desc : title ? title.substr(0, 2048) : "")]
      })
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.reply({embeds: [new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
        ]});
    }
  }
}