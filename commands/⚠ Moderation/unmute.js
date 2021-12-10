const {
    MessageEmbed, Message
  } = require(`discord.js`);
  const ms = require("ms")
  const Discord = require("discord.js")
  const marvalx = require("marvalx")
  module.exports = {
    name: `unmute`,
    category: `⚠ Moderation`,
    description: `Unmutes a member`,
    usage: `unmute <USER>`,
    memberpermissions: [`MUTE_MEMBERS`],
    
    run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
        try {
            
            const Member =
              message.mentions.members.first() ||
              message.guild.members.cache.get(args[0]);
            
            const role = message.guild.roles.cache.find(
              (role) => role.name.toLowerCase() === "muted"
            );
            if (!role) {
              try {
                message.channel.send({content:
                  "Muted role is not found, attempting to create muted role."
                }
                );
      
                let muterole = await message.guild.roles.create({
                  data: {
                    name: "muted",
                    permissions: [],
                  },
                });
                message.guild.channels.cache
                  .filter((c) => c.type === "text")
                  .forEach(async (channel, id) => {
                    await channel.permissionOverwrites.edit(muterole, {
                      SEND_MESSAGES: false,
                      ADD_REACTIONS: false,
                    });
                  });
                message.channel.send({content: "Muted role has sucessfully been created."});
              } catch (error) {
                console.log(error);
              }
            }
            let role2 = message.guild.roles.cache.find(
              (r) => r.name.toLowerCase() === "muted"
            );
            if (!Member.roles.cache.has(role2.id))
              return message.channel.send({content:
                `${Member.displayName} is not muted.`
              }
              );
            await Member.roles.remove(role2);
            const embed = new MessageEmbed()
        .setTitle(`${Member.user.username} is now unmuted!`)
        .setDescription(`${Member} Welcome back!`)
        .setImage(`https://c.tenor.com/dX6HCWiwMGoAAAAM/clapping-hands-pepe-the-frog.gif`)
        .setColor("PURPLE"
)
        .setFooter(`ID: ${Member.user.id}`, `${Member.user.avatarURL()}`)
        .setTimestamp()
        message.reply({embeds: [embed]})
            
      
           
          } catch (e) {
              console.log(e)
            return message.channel.send({content:
              `An error has occured, please try again. If this keeps happening make a 'muted' role and check bot permissions`
            }
            );
          }

    }
  };
  