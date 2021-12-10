const {
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  MessageSelectMenu
} = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  duration,
  handlemsg
} = require(`${process.cwd()}/handlers/functions`)
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo", "halp", "hilfe"],
  usage: "help [Command/Category]",
  description: "Returns all Commmands, or one specific command",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    if (args[0]) {
      const embed = new MessageEmbed().setColor("PURPLE"

).setThumbnail(`https://cdn.discordapp.com/emojis/918875075564953600.png`
 
);
      const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
      var cat = false;
      if (!cmd) {
        cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
      }
      if (!cmd && (!cat || cat == null)) {
        return message.reply({
          embeds: [embed.setColor(es.wrongcolor).setDescription(handlemsg(client.la[ls].cmds.info.help.noinfo, {
            command: args[0].toLowerCase()
          }))]
        });
      } else if (cat) {
        var category = cat;
        const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
        const embed = new MessageEmbed()
          .setColor("PURPLE"

).setThumbnail(`https://cdn.discordapp.com/emojis/918875075564953600.png`
 
)
          .setThumbnail(client.user.displayAvatarURL())
          .setTitle(`💿 Detailed Information about: \`${cat.name}\``)
          .setFooter("No Custom Information for ", client.user.displayAvatarURL());
        let embeds = allotherembeds_eachcategory();
        if (cat == "🔰 Info")
          return message.reply({
            embeds: [embeds[0]]
          })
        if (cat == "🎶 Music")
          return message.reply({
            embeds: [embeds[1]]
          })
        if (cat == "Prem mem")
          return message.reply({
            embeds: [embeds[2]]
          })
        if (cat == "💰 Premium")
          return message.reply({
            embeds: [embeds[3]]
          })
        if (cat == "⚙️ Settings")
          return message.reply({
            embeds: [embeds[4]]
          })
        if (cat == "👑 Owner")
          return message.reply({
            embeds: [embeds[5]]
          })
          if (cat == "😆 Fun")
          return message.reply({
            embeds: [embeds[6]]
          })
          if (cat == "⚠ Moderation")
          return message.reply({
            embeds: [embeds[7]]
          })
          if (cat == "♻ Utility")
          return message.reply({
            embeds: [embeds[8]]
          })
          if (cat == "🎉 Giveaways")
          return message.reply({
            embeds: [embeds[9]]
          })
          if (cat == "🖼 Image")
          return message.reply({
            embeds: [embeds[10]]
          })
        embed.setDescription(`:x: No Information found about this Category`)
        return message.reply({
          embeds: [embed]
        })
      }
      if (cmd.name) embed.addField("**💿 Command name**", `\`${cmd.name}\``);
      if (cmd.name) embed.setTitle(`💿 Detailed Information about: \`${cmd.name}\``);
      if (cmd.description) embed.addField("**💿 Description**", `\`\`\`${cmd.description}\`\`\``);
      if (cmd.aliases) try {
        embed.addField("**💿 Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
      } catch {}
      if (cmd.cooldown) embed.addField("**💿 Cooldown**", `\`\`\`${cmd.cooldown} Seconds\`\`\``);
      else embed.addField("**💿 Default-Cooldown**", `\`\`\`1 Second\`\`\``);
      if (cmd.usage) {
        embed.addField("**💿 Usage**", `\`\`\`${prefix}${cmd.usage}\`\`\``);
        embed.setFooter("Syntax: <> = required, [] = optional", ee.footericon);
      }
      return message.reply({
        embeds: [embed]
      });
    } else {
      let button_back = new MessageButton().setStyle('SUCCESS').setCustomId('1').setEmoji("916759373462786108").setLabel(`Back`)
      let button_home = new MessageButton().setStyle('DANGER').setCustomId('2').setEmoji("916759973613146122").setLabel(`Home`)
      let button_forward = new MessageButton().setStyle('SUCCESS').setCustomId('3').setEmoji('916759252402573413').setLabel(`Forward`)
      let button_support = new MessageButton().setStyle(`LINK`).setEmoji('916760261413711922').setLabel(`Support`).setURL(`https://discord.gg/akJUm4b46E`)
      let menuOptions = [{
          label: "Home",
          value: "Home",
          emoji: "916759973613146122",
          description: "My Overview of me!"
        },
        {
          label: "Information",
          value: "Information",
          emoji: "🔰",
          description: "Commands to share Information"
        },
        {
          label: "Fun",
          value: "Fun",
          emoji: "😆",
          description: "Fun Commands"
        },
        {
          label: "Moderation",
          value: "Moderation",
          emoji: "⚠",
          description: "Moderation Commands"
        },
        {
          label: "Utility",
          value: "Utility",
          emoji: "♻",
          description: "Utility Commands"
        },
        {
          label: "Image Manipulation",
          value: "Image Manipulation",
          emoji: "🖼",
          description: "Image Manipulation Commands"
        },
        {
          label: "Music",
          value: "Music",
          emoji: "🎶",
          description: "Commands to play Music / add Filter"
        },
        {
          label: "Giveaways",
          value: "Giveaways",
          emoji: "🎉",
          description: "Giveaway Commands"
        },
        {
          label: "Premium (Member)",
          value: "Premium (Member)",
          emoji: "🥇",
          description: "Premium commands for Premium Member"
        },
        {
          label: "Premium (Guild)",
          value: "Premium (Guild)",
          emoji: "💰",
          description: "Commands for Premium Server"
        },
        {
          label: "Settings",
          value: "Settings",
          emoji: "⚙️",
          description: "Commands to change Server Settings"
        },
        {
          label: "Owner",
          value: "Owner",
          emoji: "👑",
          description: "Commands to manage the Bot"
        },
        
        
        
        
      ];
      let menuSelection = new MessageSelectMenu()
        .setCustomId("MenuSelection")
        .setPlaceholder("Click me to view Help-Menu-Category-Page(s)")
        .setMinValues(1)
        .setMaxValues(6)
        .addOptions(menuOptions.filter(Boolean))
      let buttonRow = new MessageActionRow().addComponents([button_back, button_home, button_forward, button_support])
      let SelectionRow = new MessageActionRow().addComponents([menuSelection])
      const allbuttons = [buttonRow, SelectionRow]
      //define default embed
      let OverviewEmbed = new MessageEmbed()
        .setColor("PURPLE"
).setThumbnail(`https://imgur.com/RcVYDdj.gif`)
        .setFooter(`🤔`, `https://cdn.discordapp.com/emojis/918875075564953600.png`)
        .setTitle(`Information about Me`)
        .addField(":muscle: - **Features:**",
          `>>> 😂 **Fun commands** that can make you laugh
💰 **Premium function** for servers and users!
⚠ **Moderation Commands** that can help you run your server!
♻ **Utility Commands** that can also help you!
🎉 **Giveaway Commands** just if you want to give away!
🖼 **Image Manipulation** which can be fun ;)
🎼 **Advanced Music System!** **And much more!**`)
        .addField("🧭 - **MAIN:**",
          `>>> ☄ ** About ${client.commands.map(a=>a).length} Commands**
🧷 Available in **${client.guilds.cache.size} Guilds**
⌚️ My Uptime: **${duration(client.uptime).map(i=> `\`${i}\``).join("︲")}**
📶 **\`${Math.floor(client.ws.ping)}ms\` Ping**
😎 Upvote [**here**](https://discordbotlist.com/bots/zale/upvote)
`)


      //Send message with buttons
      let helpmsg = await message.reply({
        content: `*If you need more help, click the **SUPPORT** button*!`,
        embeds: [OverviewEmbed],
        components: allbuttons
      }).catch(e => {
        console.log(e.stack ? String(e.stack).grey : String(e).grey)
        return message.reply(`:x: I couldn't send help? Maybe I am missing the Permission to **EMBED LINKS**`).catch(() => {})
      });
      var edited = false;
      var embeds = [OverviewEmbed]
      for (const e of allotherembeds_eachcategory(true))
        embeds.push(e)
      let currentPage = 0;

      //create a collector for the thinggy
      const collector = helpmsg.createMessageComponentCollector({
        filter: (i) => (i.isButton() || i.isSelectMenu()) && i.user && i.message.author.id == client.user.id,
        time: 180e3
      });
      //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
      collector.on('collect', async b => {
        try {
          if (b.isButton()) {
            if (b.user.id !== message.author.id)
              return b.reply({
                content: handlemsg(client.la[ls].cmds.info.help.buttonerror, {
                  prefix: prefix
                }),
                ephemeral: true
              });

            //page forward
            if (b.customId == "1") {
              //b.reply("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
              if (currentPage !== 0) {
                currentPage -= 1
              } else {
                currentPage = embeds.length - 1
              }
            }
            //go home
            else if (b.customId == "2") {
              //b.reply("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
              currentPage = 0;
            }
            //go forward
            else if (b.customId == "3") {
              //b.reply("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
              if (currentPage < embeds.length - 1) {
                currentPage++;
              } else {
                currentPage = 0
              }

            }
            
            await helpmsg.edit({
              embeds: [embeds[currentPage]],
              components: allbuttons
            }).catch(e => {})
            b.deferUpdate().catch(e => {})


          }
          if (b.isSelectMenu()) {
            //b.reply(`***Going to the ${b.customId.replace("button_cat_", "")} Page***, *please wait 2 Seconds for the next Input*`, true)
            //information, music, admin, settings, voice, minigames, nsfw
            let index = 0;
            let vembeds = []
            let theembeds = [OverviewEmbed, ...allotherembeds_eachcategory()];
            for (const value of b.values) {
              switch (value.toLowerCase()) {
                case "overview":
                  index = 0;
                  break;
                case "information":
                  index = 1;
                  break;
                case "music":
                  index = 2;
                  break;
                case "premium (member)":
                  index = 3;
                  break;
                case "premium":
                  index = 4;
                  break;
                case "settings":
                  index = 5;
                  break;
                case "owner":
                  index = 6;
                  break;
                case "fun":
                  index = 7;
                  break;
                case "moderation":
                  index = 8;
                  break;
                case "utility": 
                  index = 9;
                  break;
                case "giveaways": 
                  index = 10;
                  break;
                case "image manipulation": 
                  index = 11;
                  break;
              }
              vembeds.push(theembeds[index])
            }
            b.reply({
              embeds: vembeds,
              ephemeral: true
            });
          }
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey : String(e).grey)
          console.log(String(e).italic.italic.grey.dim)
        }
      });

      //array of all disabled buttons
      let d_buttonRow = new MessageActionRow().addComponents([button_back.setDisabled(true), button_home.setDisabled(true), button_forward.setDisabled(true)])
      const alldisabledbuttons = [d_buttonRow]
      collector.on('end', collected => {
        if (!edited) {
          edited = true;
          helpmsg.edit({
            content: `This help menu has Timed Out!`
            ,
            embeds: [helpmsg.embeds[0]],
            components: alldisabledbuttons
          }).catch((e) => {})
        }
      });
    }

    function allotherembeds_eachcategory(filterdisabled = false) {
      //ARRAY OF EMBEDS
      var embeds = [];

      //INFORMATION COMMANDS
      var embed0 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🔰 Info").size}\`] 🔰 Information Commands 🔰`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🔰 Info").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        .addField("\u200b", "__**Sub-Categorized Commands:**__")
        .addField(`<:discord:916768005462048870> **Server Related Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "server").sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField(`🤖 **Bot Related Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "bot").sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
      embeds.push(embed0)

      //MUSIC COMMANDS type: song, queue, queuesong, bot
      var embed3 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🎶 Music").size}\`] 🎶 Music Commands 🎶`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🎶 Music").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        .addField("\u200b", "__**Sub-Categorized Commands:**__")
        .addField("📑 **Queue Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type?.includes("queue")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField("<:sound_waves:916768101759086662> **Song Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type?.includes("song")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField("🤖 **Bot Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type?.includes("bot")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
      embeds.push(embed3)

      //FILTER COMMANDS
      var embed4 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "Prem mem").size}\`] 💱 Premium (member) 💱`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "Prem mem").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
      embeds.push(embed4)

      //CUSTOM QUEUE COMMANDS
      var embed5 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "💰 Premium").size}\`] 💰 Premium (guild) 💰`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "💰 Premium").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        .addField("\u200b", "__**Sub-Categorized Commands:**__")
        .addField("🤖 **Bot Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type?.includes("bot")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField("🎶 **Music Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type?.includes("music")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
      embeds.push(embed5)
      
      //Settings
      var embed8 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").size}\`] ⚙️ Settings Commands ⚙️`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        .addField("\u200b", "__**Sub-Categorized Commands:**__")
        .addField("🤖 **Bot Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type?.includes("bot")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField("🎶 **Music Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type?.includes("music")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
      embeds.push(embed8)

      //Owner
      var embed9 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "👑 Owner").size}\`] 👑 Owner Commands 👑`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "👑 Owner").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        .addField("\u200b", "__**Sub-Categorized Commands:**__")
        .addField("<:discord:916768005462048870> **Information & Manage**", "> " + client.commands.filter((cmd) => cmd.category === "👑 Owner" && cmd.type?.includes("info")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField("🤖 **Adjust the Bot**", "> " + client.commands.filter((cmd) => cmd.category === "👑 Owner" && cmd.type?.includes("bot")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
      embeds.push(embed9)

      //Fun
      var embed10 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "😆 Fun").size}\`] 😆 Fun Commands 😆`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "😆 Fun").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        .addField("\u200b", "__**Sub-Categorized Commands:**__")
        .addField("<:discord:916768005462048870> **Information & Manage**", "> " + client.commands.filter((cmd) => cmd.category === "😆 Fun" && cmd.type?.includes("info")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField("🤖 **Adjust the Bot**", "> " + client.commands.filter((cmd) => cmd.category === "😆 Fun" && cmd.type?.includes("bot")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
      embeds.push(embed10)
      
      //Mod
      var embed11 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "⚠ Moderation").size}\`] ⚠ Moderation ⚠`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "⚠ Moderation").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        embeds.push(embed11)

      //Utils
      var embed12 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "♻ Utility").size}\`] ♻ Utility ♻`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "♻ Utility").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        embeds.push(embed12)

      //Giveaways
      var embed13 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🎉 Giveaways").size}\`] 🎉 Giveaways 🎉`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🎉 Giveaways").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        embeds.push(embed13)

      //Image Manipulation
      var embed14 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🖼 Image").size}\`] 🖼 Image Manipulation 🖼`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🖼 Image").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        embeds.push(embed14)

      return embeds.map((embed, index) => {
        return embed
          .setColor("PURPLE"

)
          .setThumbnail(`https://cdn.discordapp.com/emojis/918875075564953600.png`
 
)
          .setFooter(`Page ${index + 1} / ${embeds.length}\nTo see everything about command do: ${config.prefix}help [ NAME ]`, client.user.displayAvatarURL());
      })
    }

  }
}

