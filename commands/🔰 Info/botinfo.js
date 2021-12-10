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
  name: "botinfo",
  aliases: ["info", "about", "stats"],
  category: "🔰 Info",
  description: "Sends detailed info about the client",
  usage: "botinfo",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    const emoji = client.emojis.cache.get("916748783470149703")
    const core = os.cpus()[0];
    let tempmsg = await message.reply({
      embeds: [new Discord.MessageEmbed().setColor("PURPLE"

)
        .setTitle(`Please wait`)
        .setDescription(`Loading all the info ${emoji}`)
      ]
    })
    cpuStat.usagePercent(function(e, percent, seconds) {
      if (e) {
        return console.log(e.stack ? String(e.stack).grey : String(e).grey);
      }
      
      let connectedchannelsamount = 0;
      let guilds = client.guilds.cache.map((guild) => guild);
      for (let i = 0; i < guilds.length; i++) {
        if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
      }
      const totalGuilds = client.guilds.cache.size;
      const totalMembers = client.users.cache.size;
      countertest = 0;
      const botinfo = new Discord.MessageEmbed()
        .setAuthor(client.user.username + "'s Information", `https://cdn.discordapp.com/emojis/918875075564953600.png`, `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
        .setDescription(`All Information about me can be found here:`)
        .setColor("PURPLE"

).setThumbnail(`https://imgur.com/RcVYDdj.gif`)
        .addField(`💌 Main Info`, `\`\`\`yml\nGuilds: ${totalGuilds}\nMembers: ${totalMembers}\nUsed Commands: ${client.stats.get("global", "commands")}\nConnections: ${connectedchannelsamount}\`\`\``, true)
        .addField(`🎵 Music`, `\`\`\`yml\nConnected: ${connectedchannelsamount} Channel(s)\nPlayed: ${client.stats.get("global", "songs")} songs\nNode: lavalinknl.ml\`\`\``, true)
        .addField(`📻 System`, `\`\`\`yml\nNode.js: ${process.version},      CPU Cores: ${os.cpus().length},\nDiscord.js: v${Discord.version},   Speed: ${core.speed}MHz\`\`\``, )
        .addField(`🚀 Usage`, 
          `\`\`\`yml\nCPU usage: ${percent.toFixed(2)}%,\nRAM usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%\`\`\``
        )
        .addField(`🚮 Owner`, `\`\`\`yml\nName: Raider, Tag: Raiderko#0654\`\`\``, true)
        .addField(`💞 Links`, handlemsg(`[**Invite Me**](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands), [**Support**](https://discord.gg/sSwp9WnrCt), [**Vote for me**](https://discordbotlist.com/bots/zale/upvote)`, {
          invitelink: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`
        }))
        .setFooter(es.footertext, message.guild.iconURL());
      tempmsg.edit({
        embeds: [botinfo]
      });
    });
  },
};

