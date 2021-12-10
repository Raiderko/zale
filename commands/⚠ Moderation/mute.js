const {
    MessageEmbed, Message
  } = require(`discord.js`);
  const ms = require("ms")
  const Discord = require("discord.js")
  const marvalx = require("marvalx")
  module.exports = {
    name: `mute`,
    category: `⚠ Moderation`,
    description: `Mutes a member`,
    usage: `mute <USER> <TIME> [REASON]`,
    memberpermissions: [`MUTE_MEMBERS`],
    /**
     * 
     * @param {*} client 
     * @param {Message} message 
     * @param {*} args 
     * @param {*} cmduser 
     * @param {*} text 
     * @param {*} prefix 
     * @param {*} player 
     * @param {*} es 
     * @param {*} ls 
     * @returns 
     */
    run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
        try {
            
            const Member =
              message.mentions.members.first() ||
              message.guild.members.cache.get(args[0]);
            const time = args[1];
            let reason = args.slice(2).join(" ");
            if (!Member) return message.channel.send({content: "Member is not found."});
            if (!time) return message.channel.send({content: "Please specify a time."});
            if(!reason) reason = `None`;
            const role = message.guild.roles.cache.find(
              (role) => role.name.toLowerCase() === "muted"
            );
            if (!role) {
              try {
                message.channel.send({content:
                  "Muted role was not found, attempting to create muted role."
                }
                );
                
                message.guild.roles.create({
                  data: {
                    name: "Muted",
                    permissions: {
                        
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                    },
                  },
                }).then(message.channel.send({content: "Muted role has sucessfully been created."}));
                message.guild.channels.cache
                  .filter((c) => c.type === "text")
                  .forEach(async (channel, id) => {
                    await channel.createOverwrite.edit(muterole, {
                      SEND_MESSAGES: false,
                      ADD_REACTIONS: false,
                    });
                  })
                
              } catch (error) {
                console.log(error);
              }
            }
            let role2 = message.guild.roles.cache.find(
              (r) => r.name.toLowerCase() === "muted"
            );
            if (Member.roles.cache.has(role2.id))
              return message.channel.send({content:
                `${Member.displayName} has already been muted.`
              }
              );
            await Member.roles.add(role2);
            const embed = new MessageEmbed()
        .setTitle(`${Member.user.username} has been muted for ${ms(ms(time))}`)
        .setFields({
            name: "Reason:",
            value: reason,
            inline: true
        })
        .setImage(`https://c.tenor.com/ELQgMN5REAsAAAAC/pepe.gif`)
        .setColor("PURPLE"
)
        .setFooter(`ID: ${Member.user.id}`, `${Member.user.avatarURL()}`)
        .setTimestamp()
        message.reply({embeds: [embed]})
            
      
            setTimeout(async () => {
              await Member.roles.remove(role2);
              message.channel.send({content: `${Member} is now unmuted`});
            }, marvalx(time));
          } catch (e) {
              console.log(e)
            return message.channel.send({content:
              `An error has occured, please try again. If this keeps happening make a 'muted' role and check bot permissions`
            }
            );
          }

    }
  };
  
  