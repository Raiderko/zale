const { MessageEmbed, Message } = require('discord.js');
const db = require('../../models/afk');
const Discord = require("discord.js")
module.exports = {
  name: `afk`,
  category: `♻ Utility`,
  description: `See you soon! (I hope..)`,
  usage: `afk [reason]`,
  /**
   * 
   * @param {*} client 
   * @param {Message} message 
   * @param {*} args 
   * @param {*} cmduser 
   * @param {*} text 
   * @param {*} prefix 
   * @param {*} player 
   * @param {*} es 
   * @param {*} ls 
   */
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    const afkreason = args.slice(0).join(' ') || 'AFK';
    db.findOne({ Guild: message.guild.id, Member: message.author.id }, async(err, data) => {
      if(data) {
        return;
      } else {
        let nick = message.member.nickname || message.author.username
        Data = new db({
          Guild: message.guild.id,
          Member: message.author.id,
          Content: afkreason,
          TimeAgo: Date.now(),
          Nick: nick
        })
        Data.save()
        const afksave = new MessageEmbed()
        .setTitle(`${message.author.username} is now afk`)
        .setDescription(`**Reason**: ${afkreason}`)
        .setFooter(`See you soon!`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor("PURPLE"
)
        
        let afkms = `[AFK] ${nick}`
        const member = message.guild.members.cache.get(message.author.id)
        member.setNickname(afkms)
        
        message.channel.send({ embeds: [afksave]})
      }
    })

  }
};