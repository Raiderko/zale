const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../models/keys');

module.exports = {
     name: 'remove',
     description: 'Remove a user key!',
     /** 
      * @param {Client} client 
      * @param {Message} message 
      * @param {String[]} args 
      */

      run: async(client, message, args) => {
          // add a check so that only you can use
          const user = message.mentions.users.first();
          if(!user) return message.channel.send(":x: Please provide the user!");

          db.findOne({ user: user.id }, async(err, data) => {
              if(!data) return message.channel.send(':x: That user does not have a key yet!');
                const embed = new MessageEmbed()
                .setTitle(`Your Premium was removed!`)
                .setDescription(`Hello ${user.username}, I'm sorry to inform you that your premium was removed by ${message.author.tag}..\nIf you have anything to say or want to discuss your remove,\nDM ${message.author.tag} or join our support server **[here](https://discord.gg/sSwp9WnrCt)**!\nThanks.`)
                .setFooter(`Have a nice day.`)
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL())
                .setColor("RED")
              await db.findOneAndDelete({ user: user.id });
              message.channel.send('That users premium was successfully removed!').then(user.send({embeds: [embed]}))
          })
      }
}