const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const db = require('../../models/key');
module.exports = {
    name: 'generate',
    description: 'Generate keys!!',
    
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    run: async (client, message, args) => {
        if(message.author.id !== `767507249416503336`) return
        // add a check so that only you can use it! [this is for testing so i dont need!]
        function generatePassword() {
            var length = 9,
                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            return retVal;
        }

        let key = generatePassword();

        db.findOne({
            client: client.user.id
        }, async (err, data) => {
            if (!data) {
                data = new db({
                    client: client.user.id,
                    keys: [key]
                })
                data.save()
                return message.reply(`Key has been successfully generated!\n**I sent it in your DMS!**`).then(message.author.send(`**YOUR GENERATED KEY**\n|| ${key} ||`))
            } else {
                data.keys.push(key);
                data.save();
                return message.reply(`Key has been successfully generated!\n**Key was sent in your DMS**`).then(message.author.send(`**YOUR GENERATED KEY**\n|| ${key} ||`))
            }
        })

    }
}