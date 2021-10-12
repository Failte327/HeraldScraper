const fs = require('fs');
const cheerio = require('cheerio');
const got = require('got');
const Discord = require('discord.js');
const client = new Discord.Client();

const url='https://herald.atlasfreeshard.com/playerstat.php?player_name=Villanelle';

client.on ('message', msg => {
    let userMsg= msg.content;
    if (userMsg.includes('!who')) {
    got(url).then(response => {
    const $ = cheerio.load(response.body);
    $('td').each((i, raw) => {
        const fullCode=raw.children;
        const stats=fullCode[0].data;
        msg.channel.send(stats);
    })
}).catch(err => {
    console.log(err);
})}});


client.login('ODk3MjQ4MDM0ODg5NTU1OTcw.YWS5WQ.XEV6xLPNFbbXwYlCvOVNuLNYt04')