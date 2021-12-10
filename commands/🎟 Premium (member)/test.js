var {
    MessageEmbed
  } = require(`discord.js`);
  var config = require(`${process.cwd()}/botconfig/config.json`);
  var emoji = require(`${process.cwd()}/botconfig/emojis.json`);
  module.exports = {
    name: `test`,
    category: `Prem mem`,
    type: "info",
    description: `Tests a premium function`,
    usage: `test`,
    run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
      message.channel.send("yea")
    },
  };
  
  