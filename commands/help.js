const { prefix } = require('../config.json');
const Discord = require('discord.js');

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
    usage: '[command name]',
    cooldown: 5,
    theme: "user",
    execute(client, api, config, message, args) {
        message.delete()
        const data = [];
        const { commands } = message.client;
        var all = []
        commands.map(command => {
            if (all.find(theme => theme.name == toUpper(command.theme)) === undefined) {
                all.push({
                    name: toUpper(command.theme),
                    value: commandSyntaxe(command.name)
                })
            } else {
                const index = all.findIndex(theme => theme.name == toUpper(command.theme))
                all[index].value += " " + commandSyntaxe(command.name)
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
                    fields: all,
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL(),
                        text: "TG bot"
                    }
                }
            });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('Quoi ?');
        }

        data.push(`**Commande:** !${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.usage}`);

        message.channel.send(data, { split: true });
    },
};