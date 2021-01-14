const fetch = require("node-fetch");
const config = require('../config.json');
module.exports = {
    name: 'joke',
    admin: true,
    aliases: ['blague', 'vasyfaitmoirire'],
    description: 'Petite blague, sur un theme aléatoire',
    theme: "Fun",
    execute(client, api, config, message, args) {
        message.delete()
        fetch("https://www.blagues-api.fr/api/random", {
                headers: {
                    Authorization: `Bearer ${config.api_key.joke}`,
                },
            })
            .then((response) => response.json())
            .then((data) => {
                message.channel.send(`${data.joke}`);
                setTimeout(function() {
                    message.channel.send(data.answer);
                }, 5000);
            });
    },
};