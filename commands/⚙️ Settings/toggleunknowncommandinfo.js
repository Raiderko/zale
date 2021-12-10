const {
  MessageEmbed
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: "toggleunknowncommandinfo",
  aliases: ["toggleunknowncmdinfo", "toggleunknowninfo", "unknowncmdinfo", "unknowninfo", "unknowncommandinfo"],
  category: "⚙️ Settings",
  description: "Toggles if the Bot should send you an Informational Message, when the Command is NOT FOUND",
  usage: "toggleunknowncommandinfo",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "unkowncmdmessage"), `unkowncmdmessage`);
    return message.reply({
      embeds: [new MessageEmbed()
        .setColor("PURPLE"

).setThumbnail(`https://cdn.discordapp.com/emojis/918875075564953600.png`
 
)
        .setFooter(es.footertext, es.footericon)
        .setTitle(eval(client.la[ls]["cmds"]["settings"]["toggleunknowncommandinfo"]["variable1"]))
        .setDescription(`${client.settings.get(message.guild.id, "unkowncmdmessage") ? "I will now send an Information when the Command is not found" : "I will not send Information of Unknown Commands"}`.substr(0, 2048))
      ]
    });
  }
};

