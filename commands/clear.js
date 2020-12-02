module.exports = {
    name: 'c',
    description: 'supprime TOUT, genre une BOMBE BOUMMMM',
    admin: true,
    theme: "admin",
    execute(client, api, config, message, args) {
        message.delete()
        if (message.member.roles.cache.find(r => r.name == "Admin")) {
            var amount = parseInt(args[0]) + 1;
            if (isNaN(amount)) {
                amount = 100
            } else if (amount < 1 || amount > 99) {
                amount = 100
            }
            message.channel.bulkDelete(amount, true).catch(err => {
                console.log(err);
                message.channel.send("Wola deso je peux là j'ai poney");
            });
        }
    },
};