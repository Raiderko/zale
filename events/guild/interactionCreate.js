//Import Modules
const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const {
  delay,
  databasing,
  handlemsg,
  check_if_dj
} = require(`${process.cwd()}/handlers/functions`);
const Discord = require("discord.js");
module.exports = async (client, interaction) => {

  if (!interaction.guild) {
    await interaction.deferReply({ ephemeral: true }).catch(() => {});
    interaction.followUp(`You can use interactions in guilds only!`)
  }
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd)
        return interaction.followUp({ content: "An error has occured " });

    const args = [];
    try {
    for (let option of interaction.options.data) {
        if (option.type === "SUB_COMMAND") {
            if (option.name) args.push(option.name);
            option.options?.forEach((x) => {
                if (x.value) args.push(x.value);
            });
        } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(interaction.user.id) || interaction.member;

    cmd.run(client, interaction, args);
} catch (e) {
    interaction.deferReply({ephemeral: true}).catch(() => {})
    interaction.followUp({ ephemeral: true, content: `This command didn't work please try again or report it!`})
}
}

// Context Menu Handling
if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction);
}
  
}


