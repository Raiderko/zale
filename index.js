

const { GiveawaysManager } = require(`discord-giveaways`)
const Discord = require("discord.js");
const colors = require("colors");
const enmap = require("enmap"); 
const fs = require("fs"); 
const config = require("./botconfig/config.json")


/**********************************************************
 * @param {2} CREATE_THE_DISCORD_BOT_CLIENT with some default settings
 *********************************************************/
const client = new Discord.Client({
  fetchAllMembers: true,
  failIfNotExists: false,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users"],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
  intents: [ 
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_PRESENCES
  ],
  presence: {
    activity: {
      name: `${config.status.text}`.replace("{prefix}", config.prefix), 
      type: config.status.type, 
      url: config.status.url
    },
    status: "online"
  }
});


/**********************************************************
 * @param {5} create_the_languages_objects to select via CODE
 *********************************************************/
client.la = { }
var langs = fs.readdirSync("./languages")
for(const lang of langs.filter(file => file.endsWith(".json"))){
  client.la[`${lang.split(".json").join("")}`] = require(`./languages/${lang}`)
}
Object.freeze(client.la)
//function "handlemsg(txt, options? = {})" is in /handlers/functions 

client.giveaway = new GiveawaysManager(client, {
  storage: './giveaways.json', // Storing Data
  updateCountdownEvery: 10000, // Update The Time In GiveAway Every 10 Seconds
  default: {
      botsCanWin: false, // Can Be true Also
      embedColor: 'BLUE', // Color Of Embed
      reaction: '🎉' // Reaction For Embed
  }
})

/**********************************************************
 * @param {6} Raise_the_Max_Listeners to 25 (default 10)
 *********************************************************/
client.setMaxListeners(25);
require('events').defaultMaxListeners = 25;



/**********************************************************
 * @param {8} LOAD_the_BOT_Functions 
*********************************************************/
//those are must haves, they load the dbs, events and commands and important other stuff
Array(
  "extraevents", "loaddb", "clientvariables", "command", "events", "erelahandler", "slashCommands"
).forEach(handler => {
  try{ require(`./handlers/${handler}`)(client); }catch (e){ console.log(e.stack ? String(e.stack).grey : String(e).grey) }
});


/**********************************************************
 * @param {9} Login_to_the_Bot
*********************************************************/
client.login(process.env.token || config.token);



