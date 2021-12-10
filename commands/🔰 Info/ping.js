const {
  MessageEmbed
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  handlemsg,
  getRandomNum
} = require(`${process.cwd()}/handlers/functions`);
var cp = require('child_process');
module.exports = {
  name: "ping",
  category: "🔰 Info",
  aliases: ["latency"],
  cooldown: 2,
  usage: "ping",
  description: "Gives you information on how fast the Bot can respond to you",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    let oldate = new Date().getMilliseconds()
    message.reply({
      embeds: [new MessageEmbed()
        .setColor("PURPLE"

)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`Getting ping <a:loading:916748783470149703>`)
      ]
    }).then(msg => {
      let newtime = new Date().getMilliseconds() - oldate;
      if (newtime < 0) newtime *= -1;
      if (newtime > 10) newtime = Math.floor(newtime / 10);
      msg.edit({
        embeds: [new MessageEmbed()
          .setColor("PURPLE"

).setThumbnail(`https://cdn.discordapp.com/emojis/918875075564953600.png`)
          .setFooter("It Takes longer, because i am getting my host ping!", es.footericon)
          .setTitle(`🤖 Bot ping: \`${Math.floor(client.ws.ping + new Date().getMilliseconds() - oldate)}ms\`,

⏰ Host Ping: \`${Math.floor(new Date().getMilliseconds() - oldate)}ms\`,
          
🔈 API Ping: \`${Math.floor(client.ws.ping)}ms\``)
        ]
      });
    })

  }
}

