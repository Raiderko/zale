const { Client, Message, MessageEmbed } = require('discord.js');
const { GiveawaysManager } = require('discord-giveaways-v13') // npm i discord-giveaways
const ms = require('ms') 

module.exports = {
    name: 'giveawaystart',
    description: 'Starts a giveaway',
    category: '🎉 Giveaways',
    usage: 'giveawaystart ',
    cooldown: 5,
    aliases: ['gawstart'],
    memberpermissions: ['MANAGE_MESSAGES'],
    run: async(client, message, args, cmduser, text, prefix, player, es, ls) => {
        
    
        
    
                const channel = message.mentions.channels.first()
                if(!channel) return message.reply(`Which Channel You Want The GiveAway To be?`)
                if(!channel.isText()) return message.reply(`:x: The channel provided cannot be set as giveaway channel!`) // If Channel Is Not Mentioned
    
                const gwduration = args[1]
                if(!gwduration) return message.reply(`What duration You Want For GiveAway?`) // If No Duration Is Given
                else if(isNaN(ms(gwduration))) return message.reply(`What duration You Want For GiveAway?`) // If No Duration Is Given
                console.log(gwduration)
                const gwwinners = args[2]
                if(!gwwinners) return message.reply(`How Many Winners You Want For GiveAway?`) // If No Winner Is Provided
                else if(isNaN(gwwinners)) return message.reply(`How Many Winners You Want For GiveAway?`)
    
                const gwprize = args.slice(3).join(' ')
                if(!parseInt(gwwinners)) return message.reply(`What Is The Prize For GiveAway?`) // If No Prize Is Provided

                const winners = parseInt(gwwinners)
                const duration = parseInt(ms(gwduration))
                console.log(duration)
                
                message.channel.send(`GiveAway Started In ${channel}`)

                await client.giveaway.start(channel, { // Satrt GiveAway
                    duration: duration, // Time For GiveAway
                    prize: gwprize, // Prize For GiveAway
                    winnerCount: winners, // Winners For GiveAway
                    hostedBy: message.author, // Who Hosted GiveAway
                    messages: {
                        giveaway: '**Giveaway Started!**', // Start GiveAway Message
                        giveawayEnded: '**Giveaway Ended**', // End GiveAway Message
                        timeRemaining: 'Time Remaining: **{duration}**', // Time Remaining For GiveAway
                        inviteToParticipate: 'React With 🎉 To Enter GiveAway', // Message For GiveAway
                        winMessage: `🎉 Congrats {winners}, You Have Won **${gwprize}**!`, // Win Message
                        embedFooter: `Winners: ${winners}`, // Footer Of Embed
                        noWinner: 'No One Reacted...', // If No One Reacted
                        hostedBy: `Hosted By: ${message.author}`, // Who Hosted GiveAway
                        winners: 'Winner(s)', // Winner Coints
                        endedAt: 'Ended at',
                        utils: {
                            seconds: 'seconds',
                            minutes: 'minutes',
                            hours: 'hours',
                            days: 'days',
                            plurals: false,
                        }
                    }
                })
                
            
    }
}