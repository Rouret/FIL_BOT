const { prefix } = require('../config.json');
const Discord = require('discord.js');
const commonInfo = require("../constants/common.json")

function toUpper(string) {
    return string[0].toUpperCase() + string.slice(1)
}

function commandSyntaxe(string) {
    return "``" + string + "``"
}
module.exports = {
    name: 'help',
    description: 'Liste les commandes',
    aliases: ['h'],
    cooldown: 5,
    admin: true,
    theme: "Basic",
    execute(client, api, config, message, args) {
        message.delete()
            //Toutes les commandes disponible
        const { commands } = message.client;
        var allCommands = []
            //Création des thémes
        commands.map(command => {
            if (command.admin && !message.member.roles.cache.find(r => r.name == "Admin")) return
            if (allCommands.find(theme => theme.name == toUpper(command.theme)) === undefined) {
                allCommands.push({
                    name: toUpper(command.theme),
                    value: commandSyntaxe(command.name)
                })
            } else {
                const index = allCommands.findIndex(theme => theme.name == toUpper(command.theme))
                allCommands[index].value += " " + commandSyntaxe(command.name)
            }
        })


        if (!args.length) {
            return message.channel.send({
                embed: {
                    color: "orange",
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL()
                    },
                    title: "Besoin d'aide ? fait `!help COMMANDE`",
                    fields: allCommands,
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL(),
                        text: commonInfo.NAME
                    }
                }
            });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply("Erreur 404: la commande donné n'est pas reconnu");
        }
        const data = [];

        if (command.aliases) data.push({ name: "Aliases", value: `${command.aliases.join(', ')}` });
        if (command.description) data.push({ name: "Description", value: `${command.description}` });
        if (command.usage) data.push({ name: "Usage", value: `${prefix}${command.usage}` });

        return message.channel.send({
            embed: {
                color: "orange",
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL()
                },
                title: command.name,
                fields: [data],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL(),
                    text: "TG bot"
                }
            }
        });
    },
};