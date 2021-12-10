const { Client, Message, MessageEmbed } = require('discord.js');
const { GiveawaysManager } = require('discord-giveaways-v13') // npm i discord-giveaways
const ms = require('ms') 

module.exports = {
    name: 'giveawayend',
    description: 're-rolls a giveaway',
    category: '🎉 Giveaways',
    usage: 'giveawayend <ID>',
    cooldown: 5,
    aliases: ['gawend', `gaw-end`, `giveaway-end`],
    memberpermissions: ['MANAGE_MESSAGES'],
    run: async(client, message, args, cmduser, text, prefix, player, es, ls) => {
        
        let messageID = args[0]
            if(isNaN(messageID)) return message.reply(`Messsage ID must be a number!`) // If Message ID Isn't A Number
            if(!messageID) return message.reply(`No Message ID Provided`) // If No Message ID Is Provided
            client.giveaway.edit(messageID, { // End GiveAway Using 'edit' Method
                setEndTimestamp: Date.now() // End It After Some Seconds
            }).then(() => {
                message.channel.send(`GiveAway Successfully Ended, Will be ended in a few seconds!`)
            }).catch((_err) => { // If Their Is Error...
                message.reply(`No GiveAways With ID: **${messageID}** Is Available`)
            })
            
    }
}