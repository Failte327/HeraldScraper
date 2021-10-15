const request = require("request-promise");
const cheerio = require("cheerio");
const charinfo = []
var color = "";
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!who";
const lib = require('lib')({ token: process.env.STDLIB_SECRET_TOKEN });

client.on('message', msg => {
    if (!msg.content.startsWith(prefix)) return; {
        const args = msg.content;
        const args1 = args.split(' ');
        let playerName = args1[1];
        async function main() {
            const result = await request.get("https://herald.atlasfreeshard.com/playerstat.php?player_name=" + playerName);
            const $ = cheerio.load(result);
            //Channel ID, THIS NEEDS TO CHANGE BASED ON WHAT DISCORD CHANNEL YOU PUT IT IN. It's the second long string of numbers in the URL.
            const channel = await client.channels.fetch('897980096395227237');

            if ($("#content > table > tbody > tr.herald_bg_")!=0)
                channel.send("No such player found");
    else
    {
        //finds name but it changes location name changes based on which realm
        if ($("#content > table > tbody > tr.herald_bg_1") != undefined) {
            $("#content > table > tbody > tr.herald_bg_1").each((index, element) => {
                charinfo[1] = $(element).text();
                color = '0xff0000';
            });
        }

        if ($("#content > table > tbody > tr.herald_bg_2") != undefined) {
            $("#content > table > tbody > tr.herald_bg_2").each((index, element) => {
                charinfo[1] = $(element).text();
                color = '0x0000ff';
            });
        }

        if ($("#content > table > tbody > tr.herald_bg_3") != undefined) {
            $("#content > table > tbody > tr.herald_bg_3").each((index, element) => {
                charinfo[1] = $(element).text();
                color = '0x008000';
            });
        }
        //end getting charname

        //finds race/class
        $("#content > table > tbody > tr:nth-child(2) > td:nth-child(1)").each((index, element) => {
            charinfo[2] = $(element).text();
        });
        //ends race/class
        //finds guild name if no guild name then Guildless
        $("#content > table > tbody > tr:nth-child(6) > td:nth-child(2)").each((index, element) => {
            if ($(element).text() != "")
                charinfo[3] = $(element).text();
            else
                charinfo[3] = "Guildless"
        });
        //end guild name
        // removes the invisible characters &nsbp
        $("#content > table > tbody > tr:nth-child(7) > td:nth-child(2)").each((index, element) => {
            charinfo[4] = $(element).text();
        });
        //end rank on the server
        $("#content > table > tbody > tr:nth-child(9) > td:nth-child(2)").each((index, element) => {
            charinfo[5] = $(element).text();
        })
        //end rank in the class
        $("#content > table > tbody > tr:nth-child(11) > td:nth-child(2)").each((index, element) => {
            charinfo[6] = $(element).text();
        })
        //end total player kills
        $("#content > table > tbody > tr:nth-child(19) > td:nth-child(2)").each((index, element) => {
            charinfo[7] = $(element).text();
        })
        //end total solo kills
        $("#content > table > tbody > tr:nth-child(15) > td:nth-child(2)").each((index, element) => {
            charinfo[8] = $(element).text();
        })
        //end total deathblows
        $("#content > table > tbody > tr:nth-child(3) > td:nth-child(2)").each((index, element) => {
            charinfo[9] = $(element).text();
        })
        //end rank
        $("#content > table > tbody > tr:nth-child(4) > td:nth-child(2)").each((index, element) => {
            charinfo[10] = $(element).text();
        })
        //end realmpoints
        charinfo[1] = charinfo[1].replace(/\u00a0/g, "");
        //end
        //forms our output can use any of the variable in any order "\n" is new line can also do " " for space etc
        const myoutput = charinfo[1] + "\n" + charinfo[2] + "\n" + charinfo[3] + "\n" + charinfo[4] + "\n" + charinfo[5] + "\n" + charinfo[6] + "\n" + charinfo[7] + "\n" + charinfo[8]
        //end variable

       
        const statsEmbed =
        {
            "type": "rich",
            "title": charinfo[1],
            "description": "",
            "color": color,
            "fields": [
                {
                    "name": charinfo[2].split(" "),
                    "value": '\u200b',
                    "inline": true
                },
                {
                    "name": `Guild`,
                    "value": charinfo[3],
                    "inline": true
                },
                {
                    "name": `Rank`,
                    "value": charinfo[9],
                    "inline": true
                },
                {
                    "name": `Realmpoints`,
                    "value": charinfo[10],
                    "inline": true
                },
                {
                    "name": `Server Rank`,
                    "value": charinfo[4],
                    "inline": true
                },
                {
                    "name": `Class Rank`,
                    "value": charinfo[5],
                    "inline": true
                },
                {
                    "name": `Player Kills`,
                    "value": charinfo[6],
                    "inline": true
                },
                {
                    "name": `Solo Kills`,
                    "value": charinfo[7],
                    "inline": true
                },
                {
                    "name": `Deathblows`,
                    "value": charinfo[8],
                    "inline": true
                }
            ],
            "url": `https://herald.atlasfreeshard.com/playerstat.php?player_name=` + playerName
        }
        channel.send({ embed: statsEmbed });
    }
}
        color = '';
        // channel embed message
        main();

    }
});

client.login('ODk3MjQ4MDM0ODg5NTU1OTcw.YWS5WQ.XEV6xLPNFbbXwYlCvOVNuLNYt04')