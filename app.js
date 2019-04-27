const Discord = require('discord.js');
const client = new Discord.Client();
const fileSystem = require('fs');
const config = require('./config');
const colors = require('colors');

let beforeId = -1;

const setBeforeID = id => beforeId = id;
const getBoforeID = () => beforeId;
const printEmptyLines = number => {
    for(let i = 0; i < number; i ++)
        console.log(``);
};

const getPicturesRecursion = (channel, before, cycle) => {
    const options = before !== -1 ? {
        limit: 100,
        before
    } : {
        limit: 100
    };

    cycle ++;
    console.log(`Fetching ... Cycle: ${cycle}`.green);

    channel.fetchMessages(options).then(messages => {
        if(messages === undefined) {
            printEmptyLines(10);
            console.log(`Error: No messages in the channel!`.red);
            return process.exit();
        }

        if(messages.size <= 0) {
            printEmptyLines(10);
            console.log(`DONE!`.green);
            return process.exit();
        }

        console.log(`${messages.size} messages fetched - before id: ${before}`);

        messages.forEach(element => {
            if(element === undefined || element === null)
                return;

            const Attachment = (element.attachments).array();

            if(Attachment === undefined || Attachment === null)
                return;

            Attachment.forEach((attachment) => {
                if(attachment === undefined || attachment === null)
                    return;

                fileSystem.appendFileSync(config.file, attachment.url + '\r\n');
                console.log(attachment.url);
            });

            setBeforeID(element.id);
        });

        getPicturesRecursion(channel, getBoforeID(), cycle);
    }).catch(console.error);
}

client.on('ready', () => {
    console.log(`Discord Server Channel Attachment Downloader BOT`.green);
    console.log(`Author: Dusan Milutinovic`.green);
    printEmptyLines(5);

    console.log(`Logged in as ${client.user.tag}!`);
    printEmptyLines(5);

    const channel = client.channels.get(config.channelId);

    if (channel !== undefined)
        getPicturesRecursion(channel, getBoforeID(), 0);
});

client.login(config.token);