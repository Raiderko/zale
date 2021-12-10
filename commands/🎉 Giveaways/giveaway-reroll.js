const { Client, Message, MessageEmbed } = require('discord.js');
const { GiveawaysManager } = require('discord-giveaways-v13') // npm i discord-giveaways
const ms = require('ms') 

module.exports = {
    name: 'giveawayreroll',
    description: 're-rolls a giveaway',
    category: '🎉 Giveaways',
    usage: 'giveawayreroll <ID>',
    cooldown: 5,
    aliases: ['gawreroll', `reroll`, `re-roll`],
    memberpermissions: ['MANAGE_MESSAGES'],
    run: async(client, message, args, cmduser, text, prefix, player, es, ls) => {
        
        let messageID = args[0]
            if(isNaN(messageID)) return message.reply(`Messsage ID must be a number!`) // If Message ID Isn't A Number
            if(!messageID) return message.reply(`No Message ID Provided`) // If No Message ID Is Provided
            client.giveaway.reroll(messageID).then(() => { // Re-Roll GiveAway
                message.channel.send(`GiveAway Was Successfully Re-Rolled`)
            }).catch((_err) => { 
                message.reply(`No Giveaways With ID: **${messageID}** Is Available`)
            })
            
    }
}