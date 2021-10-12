const request= require('request-promise');
const cheerio= request('cheerio');
//const Discord = require('discord.js');
//const client = new Discord.Client();


//client.on("message", msg => {
  //  let name = msg.content;
//    if (name.includes('!who Villanelle')) {
request('https://herald.atlasfreeshard.com/playerstat.php?player_name=Villanelle', (error, response, html) => {
    if (!error && response.statusCode==200) {
     const $= cheerio.load(html);

     const datarow = $(".tbody");
     const output= datarow.find('td').text();
     $('').each((i, data) => {
         const stat= $(data).text();
         const stat1= $(data).text();
         const stat2= $(data).text();

         console.log(stat, stat1, stat2);
     })
}});

 //client.login('ODk3MjQ4MDM0ODg5NTU1OTcw.YWS5WQ.XEV6xLPNFbbXwYlCvOVNuLNYt04')
//idea is to concatenate Discord user's input into the URL to search for a specific player, and then scrape that data boi