const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'message leaderboard',
    description: `Shows leaderboard of messages sent in the channel!`,
    aliases: [`messagelb`, `msglb`],
    timeout: `5`,
    category: "♻ Utility",
    usage: `messagelb [amount]`,

    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let mLimit = args[0]
        if(!mLimit) {
            mLimit = `5000`
        } else {
        if(mLimit === `1` || `2`|| `3` || `4` || `5` || `6` || `7` || `8` || `9` || `10`) return message.reply("Too low messages to fetch!")
        }
        const Fetching = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`**Fetching over the past ${mLimit} messages <a:ultrahmm:874092144527286324>**\n> Did you know that if you do z!messagelb <ammount of messages>.\n> I'll fetch the ammount you say! `)
            .setFooter('This might take time')
        const m = await message.channel.send({embeds: [Fetching]})
        const Fetchingg = new MessageEmbed()
        .setColor('RED')
        .setDescription(`**Not worth it.. There's not even 10 members.. Can't make a Leaderboard then!** `)
        .setFooter('Sorry :(', `https://cdn.discordapp.com/emojis/706499634083659827.png`)
        
        async function fetchMore(channel, limit = 5000) {
            if (!channel) {
                throw new Error(`Expected channel, got ${typeof channel}.`);
            }
            if (limit <= 100) {
                channel.messages.fetch({
                    limit
                });
                let cmessages = await channel.messages.fetch({});
                let messages = []
                Array.from(cmessages.values()).forEach(m => messages.push(m.author.id))
                return messages
            }
            let messages = []
            let lastId = null;
            let options = {};
            let remaining = limit;


            while (remaining > 0) {
                options.limit = remaining > 100 ? 100 : remaining;
                remaining = remaining > 100 ? remaining - 100 : 0;

                if (lastId) {
                    options.before = lastId;
                }

                let cmessages = await channel.messages.fetch(options);
                Array.from(cmessages.values()).forEach(m => messages.push(m.author.id))
                if (!cmessages.last()) {
                    break;
                }
                lastId = cmessages.last().id;
            }

            return messages;
        }



        {
            try {
                const authors = await fetchMore(message.channel, mLimit);
                let frequency = {};
                authors.forEach(function (item) {
                    frequency[item] = frequency[item] ? frequency[item] + 1 : 1;
                });
                let intents = Object.entries(frequency)
                    .sort((a, b) => b[1] - a[1])
                    .map(function (x) {
                        return x[0];
                    });
                let finalthingyig = {}
                for (const u of intents) {
                    try {
                        const newe = await client.users.fetch(u)
                        if (newe.bot) continue
                        if (frequency[u] > 20) {
                            finalthingyig[newe.tag] = frequency[u]
                        } else {
                            if (finalthingyig['Others']) {

                                finalthingyig['Others'] = finalthingyig['Others'] + frequency[u]
                            } else finalthingyig['Others'] = frequency[u]
                        } 
                        

                        
                    
                    } catch (e) { }
                }
                if (Object.keys(finalthingyig).length < 10) {
                    m.edit({embeds: [Fetchingg]})
                } else {
                const embed = new MessageEmbed()
                    .setAuthor(`${message.guild.name}`, `${message.guild.iconURL({ dynamic: true })}`)
                    .setTitle(`**Leaderboard for __${message.channel.name}__**`)
                    .setColor('#a8f1ff')
                    .setDescription(
`🥇 **${Object.keys(finalthingyig)[0]}** - \`${Object.values(finalthingyig)[0]}\`
🥈 **${Object.keys(finalthingyig)[1]}** - \`${Object.values(finalthingyig)[1]}\`
🥉 **${Object.keys(finalthingyig)[2]}** - \`${Object.values(finalthingyig)[2]}\`
4. **${Object.keys(finalthingyig)[3]}** - \`${Object.values(finalthingyig)[3]}\`
5. **${Object.keys(finalthingyig)[4]}** - \`${Object.values(finalthingyig)[4]}\`
6. **${Object.keys(finalthingyig)[5]}** - \`${Object.values(finalthingyig)[5]}\`
7. **${Object.keys(finalthingyig)[6]}** - \`${Object.values(finalthingyig)[6]}\`
8. **${Object.keys(finalthingyig)[7]}** - \`${Object.values(finalthingyig)[7]}\`
9. **${Object.keys(finalthingyig)[8]}** - \`${Object.values(finalthingyig)[8]}\`
10. **${Object.keys(finalthingyig)[9]}** - \`${Object.values(finalthingyig)[9]}\`
...
        `)
                
                m.edit({content: `${message.author}`, embeds: [embed]})
                    }
            } catch (e) {
                const err = new MessageEmbed()
                .setAuthor('ERROR', 'https://images-ext-2.discordapp.net/external/osuvoFtp-tXIthBmsnVAdVeM11Zt30Aeemh_JxTnReE/https/cdn.discordapp.com/emojis/706499634083659827.png')
                .setTitle('Something went wrong!')
                .setColor('#ff4a4a')
                .setDescription(`\`\`\`js\n${error.message}\n\`\`\``)

                message.reply({ embeds: [err] })
                console.log(e)
            }
        }

        
    }
}