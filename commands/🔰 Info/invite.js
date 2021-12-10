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
  name: "invite",
  category: "🔰 Info",
  aliases: ["add"],
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    let user = message.mentions.users.first() || client.user;
    if (user) {
      if (!user.bot) return interaction.reply({
        ephemeral: true,
        content: "<:no:833101993668771842> You can't Invite a Normal user! **IT MUST BE A BOT**"
      })
      
      
      let button_invite = new MessageButton().setStyle('LINK').setLabel("Invite " + user.username).setURL(`https://discord.com/api/oauth2/authorize?client_id=${user.id}&permissions=8&scope=bot%20applications.commands`)
      //array of all buttons
      const allbuttons = [new MessageActionRow().addComponents([ button_invite])]
      message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setTitle(`Invite: **${user.username}**`)
          .setDescription(`||[*Click here for an Invitelink without Slash Commands*](https://discord.com/api/oauth2/authorize?client_id=${user.id}&permissions=8&scope=bot)||\n*Click [**here**](https://discordbotlist.com/bots/zale/upvote)* to vote for me!`)
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${user.id}&permissions=8&scope=bot%20applications.commands`)
          .setFooter(`${user.username}`, "https://imgur.com/RcVYDdj.gif")
        ],
        components: allbuttons
      });
    }
  }
}

