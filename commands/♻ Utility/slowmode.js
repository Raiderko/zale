
const {
    MessageEmbed
  } = require(`discord.js`);
  const ms = require("ms")
  const Discord = require("discord.js")
  module.exports = {
    name: `slowmode`,
    category: `♻ Utility`,
    description: `Let's you change the slowmode time!`,
    usage: `slowmode`,
    memberpermissions: [`MANAGE_GUILD`],
    run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
        const menu = new Discord.MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Select a delay')
            .addOptions([
                {label: 'OFF',value: 'OFF',},
                {label: '1s',value: '1s',},
                {label: '2s',value: '2s',},
                {label: '3s',value: '3s',},
                {label: '5s',value: '5s',},
                {label: '10s',value: '10s',},
                {label: '15s',value: '15s',},
                {label: '30s',value: '30s',},
                {label: '1m',value: '1m',},
                {label: '2m',value: '2m',},
                {label: '5m',value: '5m',},
                {label: '10m',value: '10m',},
                {label: '15m',value: '15m',},
                {label: '30m',value: '30m',},
                {label: '1h',value: '1h',},
                {label: '2h',value: '2h',},
                {label: '6h',value: '6h',}
            ]);
        let row = new Discord.MessageActionRow().addComponents(menu);

        const slowmoEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Select Slowmode! 1s > 6h')
            .setImage(`https://imgur.com/XWIhfhP.gif`)
        message.channel.send({embeds:[slowmoEmbed],components:[row]}).then(sent => {

            const filter = (int) => {
                int.deferUpdate();
                if (int.user.id === message.author.id) return true;
                return;
            }

            const collector = sent.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', time: 30e3 });
        
            collector.on('collect', collected => {
                collector.resetTimer({ time: 30e3 });
                menu.setPlaceholder(`Set to: ${collected.values[0]}`);
                row = new Discord.MessageActionRow().addComponents(menu);
                if (collected.values[0] !== 'OFF') {
                    slowmoEmbed
                        .setDescription('Enabled')
                        .setColor('GREEN')
                }
                else {
                    slowmoEmbed
                        .setDescription('Disabled')
                        .setColor('RED')
                }
                message.channel.setRateLimitPerUser(isNaN(ms(collected.values[0])/1e3) ? 0 : ms(collected.values[0])/1e3 );
                return sent.edit({ embeds:[slowmoEmbed], components:[row] });
            });
    
            collector.on('end', collected => {
                menu.setDisabled(true);
                menu.setPlaceholder(`This Menu Has Timed Out :blue_heart:`)
                row = new Discord.MessageActionRow().addComponents(menu);
                return sent.edit({ components:[row] });
            });

        })

    }
  };
  
  