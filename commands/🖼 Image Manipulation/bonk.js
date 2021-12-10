const Discord = require("discord.js");
const { Message, MessageEmbed, MessageAttachment} = require("discord.js");
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
const superagent = require('superagent');
const {
  connected
} = require("process");
module.exports = {
  name: "bonk",
  category: "🖼 Image",
  description: "bong you horni",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    var member = message.mentions.members.first() 
    if (!member) member = message.author
      const { body } = await superagent
        .get("https://api.waifu.pics/sfw/bonk");
            const embed = new Discord.MessageEmbed()
        .setColor(es.color)
        .setDescription(`${member} was bonked by ${message.author}`)
        .setImage(body.url)
        .setTimestamp()
    
message.channel.send( {embeds: [embed]});   
  }
} 