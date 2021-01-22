module.exports = {
    name: 'bienvu',
    description: 'Bein vu',
    admin: false,
    aliases: ['bv'],
    theme: "Fun",
    execute(client, api, config, message, args) {
        message.delete()
        message.channel.send("Bien vu");
    },
};