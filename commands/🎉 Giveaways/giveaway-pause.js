const { Client, Message, MessageEmbed } = require('discord.js');
const { GiveawaysManager } = require('discord-giveaways-v13') // npm i discord-giveaways
const ms = require('ms') 

module.exports = {
    name: 'giveawaypause',
    description: 'pauses a giveaway',
    category: '🎉 Giveaways',
    usage: 'giveawaypause <ID / PRIZE>',
    cooldown: 5,
    aliases: ['gawpause', `gaw-pause`, `giveaway-pause`, `pausegiveaway`],
    memberpermissions: ['MANAGE_MESSAGES'],
    run: async(client, message, args, cmduser, text, prefix, player, es, ls) => {
        
        let query = args[0]
            if(!query) return message.reply(`No Message ID or Prize of the giveaway was Provided!`); // If No Message ID Is Provided
            const giveaway = 
            
            client.giveaway.giveaways.find((g) => g.prize === query && g.guildId === message.guild.id) ||
            
            client.giveaway.giveaways.find((g) => g.messageId === query && g.guildId === message.guild.id);

            if(!giveaway) message.reply(`:x: No Giveaways found for: **${query}** !`)

            if (giveaway.pauseOptions.isPaused) return message.reply(`:x: This giveaway was already paused!`)

            client.giveaway.pause(giveaway.messageId)
            .then(() => {
                message.channel.send(`:tada: GiveAway Was Successfully Paused!`)
            }).catch((_err) => { // If Their Is Error...
                console.log(_err)
            })
            
    }
}