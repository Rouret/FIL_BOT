const ipInfo = require('../constants/ip.json')
const commonInfo = require('../constants/common.json');
module.exports = {
    name: 'ip',
    description: 'Adresse ip du serveur GrallCraft',
    theme: "Gaming",
    admin: false,
    aliases: ["cquoilip", "jeveuxjouerstp", "raboulelipstp"],
    execute(client, api, config, message, args) {
        message.channel.send({
            embed: {
                color: 0x0099ff,
                title: ipInfo.NAME,
                description: "Voici les informations pour rejoindre le serveur",
                fields: [{
                        name: 'IP',
                        value: ipInfo.IP,
                    },
                    {
                        name: 'Version',
                        value: ipInfo.VERSION,
                    },
                    {
                        name: 'Fun et Respect',
                        value: "Activé",
                    },
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL(),
                    text: commonInfo.NAME
                }
            }
        })
    },
};