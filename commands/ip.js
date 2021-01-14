const ip="craft3.ni-craft.fr:25647"
module.exports = {
    name: 'ip',
    description: 'Adresse ip du serveur GrallCraft',
    theme: "gaming",
    aliases :["cquoilip","jeveuxjouerstp","raboulelipstp"],
    execute(client, api, config, message, args) {
        message.delete()
        message.channel.send(`IP de GrallCraft ${ip}`);
    },
};