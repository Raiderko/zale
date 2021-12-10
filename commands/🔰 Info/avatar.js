const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'shows avatar of a user',
    usage: 'avatar [user]',
    cooldown: 0,
    category: "😆 Fun",
    aliases: ['av', `pfp`],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let user = message.mentions.users.first()
        if(!user) user = message.author

        const embed = new MessageEmbed()
        .setTitle(`${user.username}\'s avatar`)
        .setColor("PURPLE"
)
        .setImage(user.displayAvatarURL({dynamic: true, size: 1024}))
        .setDescription(`> [PNG](${user.avatarURL({ format: `png`})}) • [JPG](${user.avatarURL({ format: `jpg`})}) • [WEBP](${user.avatarURL({ format: `webp`})}) • [GIF](${user.avatarURL({ format: `gif`})})`)
        .setTimestamp()
        .setFooter(`I wish I had this avatar`)
        

        message.channel.send({embeds: [embed]})
    }
}