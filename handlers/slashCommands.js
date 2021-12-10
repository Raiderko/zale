const { glob } = require("glob");
const { promisify } = require("util");
const { Client, Interaction } = require("discord.js");


const globPromise = promisify(glob);

/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
module.exports = async (client, interaction) => {
    

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*.js`
    );
        
    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async (interaction) => {
        
        
        client.application.commands.set(arrayOfSlashCommands)
    });
  }