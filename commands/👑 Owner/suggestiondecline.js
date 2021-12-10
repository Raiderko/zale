const Discord = require("discord.js");
const moment = require("moment");
let os = require("os");
let cpuStat = require("cpu-stat");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  duration,
  handlemsg
} = require(`${process.cwd()}/handlers/functions`);
const {
  connected
} = require("process");
module.exports = {
  name: "suggestiondeny",
  aliases: ["suggestiondecline", "declinesuggestion", "denysug", "sugadeny", "declinesuggest", "denysuggestion"],
  category: "👑 Owner",
  description: "Declines suggestions..",
  usage: "suggestiondeny <suggestion id> <reason>",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    const id = args[0];
    console.log(id)
        const reason = args.slice(1).join(" ");

            

            const channel = client.channels.cache.get("890991496608747640");
            const suggestembed = await channel.messages.fetch(id)
            const sdata = suggestembed.embeds[0]

            const Embed = new Discord.MessageEmbed()
            .setAuthor(`${sdata.author.name}`, sdata.author.iconURL)
            .setTitle(`${sdata.title}`)
            .setDescription(`${sdata.description}`)
            .addField('State', `**❌ Denied** by ${message.author.tag}\n**Reason**: ${reason}`)
            .setFooter(`${sdata.footer.text}`, sdata.footer.iconURL)
            .setColor(`RED`)
            .setTimestamp()

            suggestembed.edit({ embeds: [Embed] })
            message.reply({ content: `Successfully denied the suggestion. (ID: ${id})`, ephemeral: true })
            
    
  },
};
