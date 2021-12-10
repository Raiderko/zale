const Discord = require("discord.js");
const { MessageButton, MessageActionRow, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");
let os = require("os");
let cpuStat = require("cpu-stat");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  duration,
  handlemsg
} = require(`${process.cwd()}/handlers/functions`);
const {
  connected
} = require("process");

module.exports = {
  name: "userinfo",
  aliases: ["whois", "user"],
  category: "🔰 Info",
  description: "Sends info about a mentioned user",
  usage: "userinfo <user>",
  type: "member",
  /** 
   * @param {Message} message 
   * @param {*} args 
   * @param {*} cmduser 
   * @param {*} text 
   * @param {*} prefix 
   * @param {*} player 
   * @param {*} es 
   * @param {*} ls 
   */
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
try {
    var permissions = [];
    var acknowledgements = 'None';

    const member = message.mentions.members.first() 
    let userRoles = member.roles.cache
  .map((x) => x)
  .filter((z) => z.name !== "@everyone");

if (userRoles.length > 100) {
  userRoles = "More than 100";
}
let safe = member.createdTimestamp;

if (safe > 604800017) {
  safe = "`Not Suspicious` <:online2:891613501326524446>";
} else {
  safe = "`Suspicious` <:dnd:891613707266846720>";
}



let nitroBadge = member.user.avatarURL({ dynamic: true });
let flags = member.user.flags.toArray().join(``);

if (!flags) {
  flags = "None";
}

flags = flags.replace(
  "HOUSE_BRAVERY",
  "`HypeSquad Bravery`"
);
flags = flags.replace(
  "EARLY_SUPPORTER",
  "<:supporter:918898734392311828> `Early Supporter`"
);
flags = flags.replace(
  "VERIFIED_DEVELOPER",
  "<:dev:918898643631763526>  `Verified Bot Developer`"
);
flags = flags.replace(
  "EARLY_VERIFIED_DEVELOPER",
  "<:dev:918898643631763526> `Verified Bot Developer`"
);
flags = flags.replace(
  "HOUSE_BRILLIANCE",
  " `HypeSquad Brilliance`"
);
flags = flags.replace(
  "HOUSE_BALANCE",
  "`HypeSquad Balance`"
);
flags = flags.replace(
  "DISCORD_PARTNER",
  " <:partner:918898700137418792> `Partner`"
);
flags = flags.replace(
  "HYPESQUAD_EVENTS",
  "`Hypesquad Events`"
);
flags = flags.replace(
  "DISCORD_CLASSIC",
  "<:nitro:918897664723132476> `Discord Classic`"
);


let stat = member.presence.activities[0];
let custom;

if (member.presence.activities.some((r) => r.name === "Spotify")) {
  custom = "Listening to Spotify";
} else if (stat && stat.name !== "Custom Status") {
  custom = stat.name;
} else {
  custom = "None";
}

if (
  member.presence.activities.some((r) => r.name !== "Spotify") &&
  stat &&
  stat.state !== null
) {
  stat = stat.state;
} else {
  stat = "None";
}
    if(member.permissions.has("KICK_MEMBERS")){
        permissions.push("Kick Members");
    }
    
    if(member.permissions.has("BAN_MEMBERS")){
        permissions.push("Ban Members");
    }
    
    if(member.permissions.has("ADMINISTRATOR")){
        permissions.push("Administrator");
    }

    if(member.permissions.has("MANAGE_MESSAGES")){
        permissions.push("Manage Messages");
    }
    
    if(member.permissions.has("MANAGE_CHANNELS")){
        permissions.push("Manage Channels");
    }
    
    if(member.permissions.has("MENTION_EVERYONE")){
        permissions.push("Mention Everyone");
    }

    if(member.permissions.has("MANAGE_NICKNAMES")){
        permissions.push("Manage Nicknames");
    }

    if(member.permissions.has("MANAGE_ROLES")){
        permissions.push("Manage Roles");
    }

    if(member.permissions.has("MANAGE_WEBHOOKS")){
        permissions.push("Manage Webhooks");
    }

    if(member.permissions.has("MANAGE_EMOJIS")){
        permissions.push("Manage Emojis");
    }

    if(permissions.length == 0){
        permissions.push("No Key Permissions Found");
    }

    if(member.user.id == message.guild.ownerId){
        acknowledgements = 'Server Owner';
    }

    const embed = new MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
        .setColor('#2F3136')
        .setFooter(`User Info`, `https://imgur.com/RcVYDdj.gif`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        .setDescription(`__**User Info**__
  **💳** \`ID:\` **${member.id}**
  **<:discord:916768005462048870>** \`Profile:\` **${member}**
  **<:Zale_purp:918875075564953600>** \`Bot:\` **${member.user.bot ? "Yes" : "No"}**
  **<:right:916759252402573413>** \`Created At:\` **${moment(member.user.createdAt).format(
"MMMM Do YYYY, H:mm:ss a"
)}**
  __**Member Info**__
  **👨‍💻** \`Username:\` **${member.displayName} **
  **🥢** \`Tag:\` ** ${member.user.discriminator}**
  **🕵️‍♂️** \`Nickname:\` **${member.nickname ? member.nickname : "No Nickname"}**
  **<:home:916759973613146122>** \`Joined At:\` **${moment(member.joinedAt).format(
"MMMM Do YYYY, H:mm:ss a"
  )}**
  **🎮** \`Activity:\` **${custom}**
  __**Roles:**__
  ${userRoles}
  __**Badge Information**__
  ${flags} 
  
  __**Boosting Since:**__ 
  **<:boosted:918895940868390942>**${member.premiumSince ? member.premiumSince : "Not boosted yet!"}
   __**Permissions:**__ 
  **🔰**\`${permissions.join(` | `)}\`
  __**Acknowledgements:**__
  **〽**\`${acknowledgements}\``)
.setColor("PURPLE")
let tempmsg = await message.reply({
    embeds: [new Discord.MessageEmbed().setColor("PURPLE"

)
      .setTitle(`Please wait`)
      .setDescription(`Loading all the info <a:loading:916748783470149703>`)
    ]
  }).then((msg) => msg.edit({ embeds: [ embed ]}))
} catch (e) {
    console.log(e)
    var permissions = [];
    var acknowledgements = 'None';

    const member = message.mentions.members.first() 
    let userRoles = member.roles.cache
  .map((x) => x)
  .filter((z) => z.name !== "@everyone");

if (userRoles.length > 100) {
  userRoles = "More than 100";
}
let safe = member.createdTimestamp;

if (safe > 604800017) {
  safe = "`Not Suspicious` <:online2:891613501326524446>";
} else {
  safe = "`Suspicious` <:dnd:891613707266846720>";
}



let nitroBadge = member.user.avatarURL({ dynamic: true });
let flags = member.user.flags.toArray().join(``);

if (!flags) {
  flags = "None";
}

flags = flags.replace(
  "HOUSE_BRAVERY",
  "`HypeSquad Bravery`"
);
flags = flags.replace(
  "EARLY_SUPPORTER",
  "<:supporter:918898734392311828> `Early Supporter`"
);
flags = flags.replace(
  "VERIFIED_DEVELOPER",
  "<:dev:918898643631763526>  `Verified Bot Developer`"
);
flags = flags.replace(
  "EARLY_VERIFIED_DEVELOPER",
  "<:dev:918898643631763526> `Verified Bot Developer`"
);
flags = flags.replace(
  "HOUSE_BRILLIANCE",
  " `HypeSquad Brilliance`"
);
flags = flags.replace(
  "HOUSE_BALANCE",
  "`HypeSquad Balance`"
);
flags = flags.replace(
  "DISCORD_PARTNER",
  " <:partner:918898700137418792> `Partner`"
);
flags = flags.replace(
  "HYPESQUAD_EVENTS",
  "`Hypesquad Events`"
);
flags = flags.replace(
  "DISCORD_CLASSIC",
  "<:nitro:918897664723132476> `Discord Classic`"
);



    if(member.permissions.has("KICK_MEMBERS")){
        permissions.push("Kick Members");
    }
    
    if(member.permissions.has("BAN_MEMBERS")){
        permissions.push("Ban Members");
    }
    
    if(member.permissions.has("ADMINISTRATOR")){
        permissions.push("Administrator");
    }

    if(member.permissions.has("MANAGE_MESSAGES")){
        permissions.push("Manage Messages");
    }
    
    if(member.permissions.has("MANAGE_CHANNELS")){
        permissions.push("Manage Channels");
    }
    
    if(member.permissions.has("MENTION_EVERYONE")){
        permissions.push("Mention Everyone");
    }

    if(member.permissions.has("MANAGE_NICKNAMES")){
        permissions.push("Manage Nicknames");
    }

    if(member.permissions.has("MANAGE_ROLES")){
        permissions.push("Manage Roles");
    }

    if(member.permissions.has("MANAGE_WEBHOOKS")){
        permissions.push("Manage Webhooks");
    }

    if(member.permissions.has("MANAGE_EMOJIS")){
        permissions.push("Manage Emojis");
    }

    if(permissions.length == 0){
        permissions.push("No Key Permissions Found");
    }

    if(member.user.id == message.guild.ownerId){
        acknowledgements = 'Server Owner';
    }

    const embed = new MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
        .setColor('#2F3136')
        .setFooter(`User Info`, `https://imgur.com/RcVYDdj.gif`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        .setDescription(`__**User Info**__
  **💳** \`ID:\` **${member.id}**
  **<:discord:916768005462048870>** \`Profile:\` **${member}**
  **<:Zale_purp:918875075564953600>** \`Bot:\` **${member.user.bot ? "Yes" : "No"}**
  **<:right:916759252402573413>** \`Created At:\` **${moment(member.user.createdAt).format(
"MMMM Do YYYY, H:mm:ss a"
)}**
  __**Member Info**__
  **👨‍💻** \`Username:\` **${member.displayName} **
  **🥢** \`Tag:\` ** ${member.user.discriminator}**
  **🕵️‍♂️** \`Nickname:\` **${member.nickname ? member.nickname : "No Nickname"}**
  **<:home:916759973613146122>** \`Joined At:\` **${moment(member.joinedAt).format(
"MMMM Do YYYY, H:mm:ss a"
  )}**
  **🎮** \`Activity:\` **None**
  __**Roles:**__
  ${userRoles}
  __**Badge Information**__
  ${flags} 
  
  __**Boosting Since:**__ 
  **<:boosted:918895940868390942>**${member.premiumSince ? member.premiumSince : "Not boosted yet!"}
   __**Permissions:**__ 
  **🔰**\`${permissions.join(` | `)}\`
  __**Acknowledgements:**__
  **〽**\`${acknowledgements}\``)
.setColor("PURPLE")
let tempmsg = await message.reply({
    embeds: [new Discord.MessageEmbed().setColor("PURPLE"

)
      .setTitle(`Please wait`)
      .setDescription(`Loading all the info <a:loading:916748783470149703>`)
    ]
  }).then((msg) => msg.edit({ embeds: [ embed ]}))
}
    
  }
}