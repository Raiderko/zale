
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
const {
  connected
} = require("process");
module.exports = {
  name: "oogway",
  category: "🖼 Image",
  description: "Oogway says..",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
      let textt = args.slice(0).join(" ")?.trim()?.split(/ +/g)?.join("+")

    const file = new MessageAttachment(`https://api.popcat.xyz/oogway?text=${textt}`, `oogway-${message.author.username}.png`)

    message.reply({ files: [file] })

  }
}