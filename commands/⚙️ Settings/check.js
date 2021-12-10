const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const db = require('../../models/key');
const db1 = require('../../models/keys');
require('discord-reply');

module.exports = {
    name: 'redeem',
    aliases: [`check`],
    description: 'redeem your key!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    run: async (client, message, args) => {
        let key = args.join(" ");
        if (!key) return message.channel.send(':x: Please provide the key you wanna redeem!')
        if (key.length > 9) return message.channel.send(':x: That is an invalid key!');

        db.findOne({
            client: client.user.id
        }, async (err, data) => {
            if (!data) return message.channel.send(":x: The are no generated keys available right now!");
            let wew = data;
            if (data.keys.includes(key)) {
                db1.findOne({
                    user: message.author.id
                }, async (err, data) => {
                    if (!data) {
                        data = new db1({
                            user: message.author.id,
                            key
                        }).save()

                        removeA(wew.keys, key)
                        wew.save();
                        console.log(wew.keys);
                        const embed = new MessageEmbed()
                        .setTitle(`Successfully redeemed your key!`, message.author.displayAvatarURL({dynamic: true}))
                        .setDescription(`${message.author}\nFrom now you are verified and have access to premium commands!\n**Enjoy!**`)
                        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                        .setColor("PURPLE"
)

                        const embed1 = new MessageEmbed()
                        .setTitle(`Welcome to *Premium*!`, message.author.displayAvatarURL({dynamic: true}))
                        .setDescription(`From now you are verified and have access to premium commands!\nYou now can use over **0** new commands!\nHave fun with your *Premium*!`)
                        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                        .setColor("GREEN")
                        message.channel.send({embeds: [embed]}).then(message.author.send({embeds: [embed1]}))
                    } else {
                        return message.channel.send(':x: You already have a key active!!')
                    }
                })
            }
        })
    }
}

function removeA(arr) {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}