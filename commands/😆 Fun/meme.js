const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'meme',
    description: 'ahah funny',
    usage: 'meme',
    category: "😆 Fun",
    cooldown: 5,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const fetch = require('node-fetch')
        async function embed() {
            let embed1 = null
            await fetch(`https://meme-api.herokuapp.com/gimme`).then(res => res.json().then(url => {
                embed1 = new MessageEmbed()
                    .setTitle(url.title)
                    .setImage(url.url)
                    .setTimestamp()
                    .setColor("PURPLE"
)
                    .setFooter(`${url.ups} likes`)
            }))
            return embed1
        }
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('reload')
                .setLabel('Next')
                .setEmoji(`➡`)
                .setStyle('PRIMARY')
            )
        const disabled = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('reload')
                .setLabel('Next')
                .setEmoji(`➡`)
                .setStyle('PRIMARY')
                .setDisabled(true)

            )

        let m = await message.channel.send({
            embeds: [await embed()],
            components: [row]
        })

        const collector = m.createMessageComponentCollector({
            componentType: 'BUTTON',
            time: 120000,
        });
        collector.on('collect', async i => {
            if (i.user.id === message.author.id) {
                i.deferUpdate()
                await update(m)
                collector.stop()
            } else {
                i.reply({
                    content: `These buttons aren't for you!`,
                    ephemeral: true
                });
            }
        })
        collector.on('end', (mes, r) => {
            if (r == 'time') {
                m.edit({
                    components: [disabled],
                })
            }
        })

        async function update(m) {
            m.edit({
                embeds: [await embed()]
            }).catch(e => console.log(e.requestData.json.embeds))

            const collector = m.createMessageComponentCollector({
                componentType: 'BUTTON',
                time: 120000,
            });
            collector.on('collect', async i => {
                if (i.user.id === message.author.id) {

                    i.deferUpdate()
                    await update(m)
                    collector.stop()
                } else {
                    i.reply({
                        content: `These buttons aren't for you!`,
                        ephemeral: true
                    });
                }
            })
            collector.on('end', (mes, r) => {
                if (r == 'time') {
                    m.edit({
                        components: [disabled],
                    })
                }
            })
        }

    }
}