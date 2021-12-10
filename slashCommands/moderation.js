
   const {CommandInteraction, MessageActionRow, MessageButton, MessageEmbed} = require('discord.js')

module.exports = {
    name: 'moderate',
    description: 'Moderate a user',
    options: [
        {
            name: 'user',
            description: 'The user to moderate',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for moderation',
            type: 'STRING',
            required: false
        }
    ],
    /**
     *
     * @param {} client
     * @param {CommandInteraction} interaction
     * @param {string[]} args
     */
    run: async (client, interaction, cmduser, es, ls, prefix, player, message) => {
        const member = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason') || 'No reason specified.'

        if (member.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.followUp({content: 'I cannot moderate this user as their highest role is higher than mine or I have the same highest role as them.', ephemeral: true})
        if (member.id === interaction.guild.ownerId) return interaction.followUp({content: 'I cannot moderate the owner of the server.', ephemeral: true})
        if (member.id === interaction.user.id) return interaction.followUp({content: 'You cannot moderate yourself.', ephemeral: true})
        if (member.id === interaction.guild.me.id) return interaction.followUp({content: 'I cannot moderate myself.', ephemeral: true})
        if (member.id === `767507249416503336`) return interaction.followUp({content: 'I cannot moderate the owner of the bot.', ephemeral: true})

        let embed = new MessageEmbed().setColor("RED").setDescription(`Please choose an action for ${member}`)
        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageButton().setCustomId('kick').setLabel('Kick').setStyle('DANGER').setEmoji('💥').setDisabled(state),
                new MessageButton().setCustomId('ban').setLabel('Ban').setStyle('DANGER').setEmoji('⚒').setDisabled(state),
                new MessageButton().setCustomId('mute').setLabel('Mute').setStyle('DANGER').setDisabled(state).setEmoji('🤐'),
                new MessageButton().setCustomId('unmute').setLabel('Unmute').setStyle('DANGER').setDisabled(state).setEmoji('😮')
            )
        ]
        interaction.followUp({embeds: [embed], components: components(false)})

        const filterr = (i) => i.user.id === interaction.user.id
        const collector = interaction.channel.createMessageComponentCollector({filterr, componentType: 'BUTTON', time: 30000})

        collector.on('collect', async (i) => {
        if(i.isButton()) {
            if (i.customId === 'kick') {
                if (!i.member.permissions.has('KICK_MEMBERS')) return i.reply({embeds: [new MessageEmbed().setDescription(`<:greycross:907281080275599401> You need the \`KICK_MEMBERS\` permission to use this command.`).setColor('RED')], ephemeral: true})
                await member.kick(reason)
                const embed1 = new MessageEmbed().setColor("RED").setDescription(`Successfully kicked ${member.toString()} for \`${reason}\``)
                i.reply({embeds: [embed1]})
            } else if (i.customId === 'ban') {
                if (!i.member.permissions.has('BAN_MEMBERS')) return i.reply({embeds: [new MessageEmbed().setDescription(`<:greycross:907281080275599401> You need the \`BAN_MEMBERS\` permission to use this command.`).setColor('RED')], ephemeral: true})
                await member.ban(reason)
                const embed2 = new MessageEmbed().setColor("RED").setDescription(`Successfully banned ${member.toString()} for \`${reason}\``)
                i.update({embeds: [embed2]})
            } else if (i.customId === 'mute') {
                if (!i.member.permissions.has('MANAGE_ROLES')) return i.reply({embeds: [new MessageEmbed().setDescription(`<:greycross:907281080275599401> You need the \`MANAGE_ROLES\` permission to use this command.`).setColor('RED')], ephemeral: true})
                const rol = interaction.guild.roles.cache.find(
                    (role) => role.name.toLowerCase() === "muted"
                  );
                if (!rol) return i.reply({content: `There is no mute role set for this server.`, ephemeral: true})
                const role = i.guild.roles.cache.get(rol)
                if (!role) return
                const hasRole = member.roles.cache.has(role.id)
                if (hasRole) return i.reply({embeds: [new MessageEmbed().setDescription(`<:greycross:907281080275599401> ${member.toString()} already has the mute role.`).setColor('RED')], ephemeral: true})
                await member.roles.add(role)
                const embed3 = new MessageEmbed().setColor("RED").setDescription(`Successfully muted ${member.toString()}.`)
                i.reply({embeds: [embed3]})
            } else if (i.customId === 'unmute') {
                if (!i.member.permissions.has('MANAGE_ROLES')) return i.reply({embeds: [new MessageEmbed().setDescription(`<:greycross:907281080275599401> You need the \`MANAGE_ROLES\` permission to use this command.`).setColor('RED')], ephemeral: true})
                const dat = i.guild.roles.cache.find(
                    (role) => role.name.toLowerCase() === "muted"
                  );
                  
                if (!dat) return i.reply({content: `There is no mute role set for this server`, ephemeral: true})
                const role = i.guild.roles.cache.get(dat)
                if (!role) return
                const hasRole = member.roles.cache.has(role.id)
                if (!hasRole) return i.reply({embeds: [new MessageEmbed().setDescription(`<:greycross:907281080275599401> ${member.toString()} does not have the mute role.`).setColor('RED')], ephemeral: true})
                await member.roles.remove(role)
                const embed4 = new MessageEmbed().setColor("RED").setDescription(`Successfully unmuted ${member.toString()}.`)
                i.reply({embeds: [embed4]})
            }
        }
        })
        collector.on('end', () => {
            return interaction.editReply({components: components(true)})
        })
    }
}
