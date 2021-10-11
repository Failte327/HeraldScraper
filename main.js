const request= require('request-promise');
const request= request('cheerio');
const Discord = require('discord.js');
const client = new Discord.Client();


client.on("message", msg => {
    let name = msg.content;
    if (name.includes('!who')) {
request('https://herald.atlasfreeshard.com/playerstat.php?player_name=', (error, response, html) => {
    if (!error && response.statusCode==200) {
     const $= cheerio.load(html);
}}};

 client.login('ODk3MjQ4MDM0ODg5NTU1OTcw.YWS5WQ.XEV6xLPNFbbXwYlCvOVNuLNYt04')
//idea is to concatenate Discord user's input into the URL to search for a specific player, and then scrape that data boi