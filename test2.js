const fs = require('fs');
const cheerio = require('cheerio');
const got = require('got');

const url='https://herald.atlasfreeshard.com/playerstat.php?player_name=Villanelle';


got(url).then(response => {
    const $ = cheerio.load(response.body);
    console.log($('tr')[0].children);
}).catch(err => {
    console.log(err);
})



//idk im stuck
