const Discord = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord.js");
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
  name: "vote",
  aliases: ["upvote"],
  category: "🔰 Info",
  description: "Sends a link for upvote :)",
  usage: "vote",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    const emoji = client.emojis.cache.get("916748783470149703")
    let vote = new MessageButton().setStyle('LINK').setLabel("Vote for " + client.user.username).setURL(`https://discordbotlist.com/bots/zale/upvote`).setEmoji(`918875075564953600`)
    const allbuttons = [new MessageActionRow().addComponents([ vote ])]
    const core = os.cpus()[0];
    
      const botinfo = new Discord.MessageEmbed()
        .setAuthor("Vote for Zale!", `https://cdn.discordapp.com/emojis/918875075564953600.png`, `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
        .setColor("PURPLE"

)
.setDescription(`**😎 Vote**\n> You can vote [**here**](https://discordbotlist.com/bots/zale/upvote) or click the button below!`)
        .addField(`💞 Useful Links`, handlemsg(`> [**Invite Me**](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands), [**Support**](https://discord.gg/sSwp9WnrCt)`, {
          invitelink: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`
        }))
        .setFooter(`${es.footertext} | I really appreciate your vote and all your support from everyone!`, message.guild.iconURL());
      message.channel.send({
        embeds: [botinfo], components: allbuttons
      });
    
  },
};

