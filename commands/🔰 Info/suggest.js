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
  name: "suggest",
  aliases: ["suggestion", "sug"],
  category: "🔰 Info",
  description: "Suggest and help us!",
  usage: "suggest <suggestion>",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    const suggestion = args.join(" ");
    if(!suggestion) return message.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`:x: What do you want to suggest?..`)
.setDescription(`Please specify a suggestion!\nexample: z!suggest please gib premium `)
.setColor("RED")
.setFooter(`${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))]})

        const channel = client.channels.cache.get("890991496608747640")
        const Embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        .setTitle(`New **Zale Bot** suggestion!`)
        .setDescription(`**Suggestion**: ${suggestion}`)
        .addField('State', 'Pending..')
        .setFooter(`Suggestion ID = Message ID`, `https://cdn.discordapp.com/emojis/918875075564953600.png`)
        .setColor("PURPLE"
)
        .setTimestamp()

        channel.send({ embeds: [Embed] });
        
        message.channel.send({ content: `${message.author}, **Your suggestion has been sent**!`, ephemeral: true });

    
  },
};

