const rp = require('request-promise');
const $= require('cheerio');
const url = 'https://herald.atlasfreeshard.com/playerstat.php?player_name=Villanelle';

rp(url)
    .then(function(html){
        //success!
        console.log($('table > td', html));
    })
    .catch(function(err){
        //handle error
    });





