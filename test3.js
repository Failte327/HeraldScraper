const request = require("request-promise")
const cheerio = require("cheerio");

request("https://herald.atlasfreeshard.com/playerstat.php?player_name=Villanelle", (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const datarow = $(".herald_table_border");
        const output = datarow.find("herald_bg_2").text();
        $(".herald_table_border").each((i, data) => {
            const item = $(data).text();

            console.log(item);
        })
    }

});

