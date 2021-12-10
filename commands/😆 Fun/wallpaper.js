const hdqwalls = require("hdqwalls-wrapper")
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'wallpaper',
    description: 'returns a random wallpaper',
    usage: 'z!wallpaper <something>',
    cooldown: '10',
    category: "😆 Fun",
    aliases: ['wp'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const query = args.join(" ");

        if(!query) return message.channel.send(':x: Please provide something to search for')

        const image = await hdqwalls(query);


        const num = Math.floor((Math.random()) * 20);

        console.log(num)
        const embed = new MessageEmbed()
            .setTitle('Here\'s the Wallpaper i found')
            .setColor("PURPLE"
)
            .setImage(image[num])
            .setFooter(`If there\'s not any image please retry!`)
            .setTimestamp()

        message.channel.send({embeds: [embed]})
        


    }
}