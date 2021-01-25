module.exports = {
    name: 'speak',
    description: 'Je peux parler',
    admin: true,
    aliases: ['s'],
    theme: "Administration",
    execute(client, api, config, message, args) {
        message.delete()
        message.channel.send(args.join().replace(/,/g, " "));
    },
};