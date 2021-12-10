const {
    MessageEmbed
  } = require(`discord.js`);
  const fetch = require("node-fetch")
  const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
  const playermanager = require(`${process.cwd()}/handlers/playermanager`);
  module.exports = {
    name: `lyrics`,
    category: `🎶 Music`,
    aliases: [`lyric`],
    description: `Searches a lyrics of a song`,
    usage: `lyrics [Song Name]`,
    cooldown: 5,
    
    run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
        try {
        let song = args.join(" ")
        if(!song) song = player.queue.current.title
        if(!song && !player) return message.channel.send({embeds: [new MessageEmbed()
        .setTitle(`:x: Cannot send lyrics!`)
        .setDescription(`I'm not playing any songs!\n**If you want to search for lyrics of some song please do z!lyrics [song]!**`)
        .setColor("RED")]})
        const url = `${song.replace(" ", "+")}`
        const json = await fetch(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(url)}`).then(r => r.json())
        if (json.error) return message.channel.send({embeds: [new MessageEmbed()
            .setTitle(`:x: Cannot send lyrics!`)
            .setDescription(`I did not find any song named: *${song}*!\n**Please try again!**`)
            .setColor("RED")]})

        
        let lyrics = json.lyrics;

        const embed = new MessageEmbed()
            .setTitle(json.title === "none" ? json.title : json.title)
            .setURL(json.links.genius)
            .setThumbnail(json.image)
            .addField("Artist", json.author)
            .setDescription("Lyrics:\n\n" + lyrics)
            .setColor("PURPLE"
)
            .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send({embeds: [embed]})
        }catch(e) {
            return console.log(e)
        }
        

    }
}