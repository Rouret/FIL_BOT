// require the discord.js module
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const commonInfo = require('./constants/common.json');
const api = ""
    // create a new discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFlies = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const DEV_MODE = false;
const PREFIX = DEV_MODE ? config.prefix_dev : config.prefix
    //prefix_dev
for (const file of commandFlies) {
    //Store dans client.commands l'ensemble des commane 
    // name + info
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log("I'm on fire!");
});


// client.on('raw', async event => {
//     //Toute les actions
// });

client.on('message', message => {

    //event
    if (message.content.match(/!s/)) {
        message.react('⚠');
    }

    if (message.content[0] != PREFIX) return;

    //Définit les arguments
    const args = message.content.slice(PREFIX.length).split(/ +/);
    //Get le nom de la commande
    const commandName = args.shift().toLowerCase();
    //Va chercher les info de la commande
    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    //si la commande a besoin d'etre admin, il faut le role Admin
    if (command.admin && !message.member.roles.cache.find(r => r.name == "Admin")) return
    if (command.args && !args.length) {
        return;
    }
    if (command.guildOnly && message.channel.type !== 'text') return;

    try {
        command.execute(client, api, config, message, args);
    } catch (error) {
        console.error(error);
        message.channel.send('Heu ... petite erreur interne ... <@259817328458334211> ALED ');
        console.log(message)
        client.channels.cache.find(channel => channel.id === commonInfo.ADMIN_CHANNEL).send({
            embed: {
                color: 0x0099ff,
                title: "ERROR REPORT",
                fields: [{
                        name: 'TYPE',
                        value: error.name,
                    },
                    {
                        name: 'MESSAGE',
                        value: error.message,
                    },
                    {
                        name: 'MESSAGE',
                        value: `https://discord.com/channels/${commonInfo.SERVER_ID}/${message.channel.id}/${message.id}`,
                    }

                    //`https://discord.com/channels/${server}/${channel}/${message}`
                    //https://discord.com/channels/601518534891143207/748567621749964862/799311240018657300


                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL(),
                    text: commonInfo.NAME
                }
            }
        })

    }

});

client.login(config.token);

//TODO commande agenda