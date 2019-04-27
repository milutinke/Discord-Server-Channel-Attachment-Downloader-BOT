const Discord = require('discord.js');
const client = new Discord.Client();
const fileSystem = require('fs');
const config = require('./config');

let beforeId = -1;

const setBeforeID = id => beforeId = id;
const getBoforeID = () => beforeId;

const getPicturesRecursion = (channel, before, cycle) => {
    const options = before !== -1 ? {
        limit: 100,
        before
    } : {
        limit: 100
    };

    cycle++;
    console.log("Fetching ... Cycle: " + cycle);
    console.log(options);

    channel.fetchMessages(options).then(messages => {
        console.log(`${messages.size} messages fetched - before: ${before}`);

        messages.forEach(element => {
            const Attachment = (element.attachments).array();

            Attachment.forEach((attachment) => {
                fileSystem.appendFileSync(config.file, attachment.url + '\r\n');
                console.log(attachment.url);
            });

            setBeforeID(element.id);
        });

        getPicturesRecursion(channel, getBoforeID(), cycle);
    }).catch(console.error);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const channel = client.channels.get(config.channelId);

    if (channel !== undefined)
        getPicturesRecursion(channel, getBoforeID(), 0);
});

client.login(config.token);