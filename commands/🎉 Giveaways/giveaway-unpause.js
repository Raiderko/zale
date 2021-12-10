const { Client, Message, MessageEmbed } = require('discord.js');
const { GiveawaysManager } = require('discord-giveaways-v13') // npm i discord-giveaways
const ms = require('ms') 

module.exports = {
    name: 'giveawayunpause',
    description: 'unpauses a giveaway',
    category: '🎉 Giveaways',
    usage: 'giveawayunpause <ID / PRIZE>',
    cooldown: 5,
    aliases: ['gawunpause', `gaw-unpause`, `giveaway-unpause`, `unpausegiveaway`, `giveawayresume`, `resumegiveaway`, `gaw-resume`, `resumegaw`, `gawresume`],
    memberpermissions: ['MANAGE_MESSAGES'],
    run: async(client, message, args, cmduser, text, prefix, player, es, ls) => {
        
        let query = args[0]
            if(!query) return message.reply(`No Message ID or Prize of the giveaway was Provided!`); // If No Message ID Is Provided
            const giveaway = 
            
            client.giveaway.giveaways.find((g) => g.prize === query && g.guildId === message.guild.id) ||
            
            client.giveaway.giveaways.find((g) => g.messageId === query && g.guildId === message.guild.id);

            if(!giveaway) message.reply(`:x: No Giveaways found for: **${query}** !`)

            if (!giveaway.pauseOptions.isPaused) return message.reply(`:x: This giveaway is not Paused!`)

            client.giveaway.unpause(giveaway.messageId)
            .then(() => {
                message.channel.send(`:tada: GiveAway Was Successfully Unpaused and will Continue!`)
            }).catch((_err) => { // If Their Is Error...
                console.log(_err)
            })
            
    }
}