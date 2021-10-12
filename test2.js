const fs = require('fs');
const cheerio = require('cheerio');
const got = require('got');

const url='https://herald.atlasfreeshard.com/playerstat.php?player_name=Villanelle';


got(url).then(response => {
    const $ = cheerio.load(response.body);
    $('td').each((i, raw) => {
        const fullCode=raw.children;
        const stats=fullCode[0].data;
        console.log(stats);
    })
}).catch(err => {
    console.log(err);
})



//idk im stuck
