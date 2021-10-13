const request = require("request-promise")
const cheerio = require("cheerio");
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

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

await lib.discord.channels['@0.2.0'].messages.create({
    "channel_id": `${context.params.event.channel_id}`,
    "content": "",
    "tts": false,
    "embeds": [
      {
        "type": "rich",
        "title": `Villanelle`,
        "description": "",
        "color": 0x3869ed,
        "fields": [
          {
            "name": `Norseman Shadowblade`,
            "value": `Guildless`,
            "inline": true
          },
          {
            "name": `Isen Vakten`,
            "value": `2L2`
          },
          {
            "name": `Realmpoints`,
            "value": `14 330`,
            "inline": true
          },
          {
            "name": `Rank on the Server`,
            "value": `88`
          },
          {
            "name": `Rank in the Class`,
            "value": `5`
          },
          {
            "name": `Total Player Kills`,
            "value": `175`
          },
          {
            "name": `Total Solo Kills`,
            "value": `21`
          },
          {
              "name": `Total Deathblows`,
              "value": `73`
          }
        ],
        "url": `https://herald.atlasfreeshard.com/playerstat.php?player_name=Villanelle`
      }
    ]
  });