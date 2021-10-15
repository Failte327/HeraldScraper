const request = require("request-promise");
const cheerio = require("cheerio");
const charinfo = []
const soloinfo = []
const sololink = []
var color = "";
const ChannelID='897980096395227237' //Channel ID
const DiscordBotToken='ODk3MjQ4MDM0ODg5NTU1OTcw.YWS5WQ.XEV6xLPNFbbXwYlCvOVNuLNYt04' //Bot Token
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!who";
const prefix2 = "!solo";

client.on('message', msg => {
    if (msg.content.startsWith(prefix)) {
        const args = msg.content;
        const args1 = args.split(' ');
        let playerName = args1[1];
        async function main() {
            const result = await request.get("https://herald.atlasfreeshard.com/playerstat.php?player_name=" + playerName);
            const $ = cheerio.load(result);
            const channel = await client.channels.fetch(ChannelID);

            if ($("#content > table > tbody > tr.herald_bg_") != 0)
                channel.send("No such player found");
            else {
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
    if (msg.content.startsWith(prefix2)) {
        async function main2() {
            const result = await request.get("https://herald.atlasfreeshard.com/index.php?show=top_solo_kills");
            const $ = cheerio.load(result);
            const channel = await client.channels.fetch(ChannelID);
           let z = 0;
           let x = 1;
            for (let i = 0; i < 10; i++) {
                x++;
                $("#content > table > tbody > tr:nth-child(" + x +") > td:nth-child(1)").each((index, element) => {
                    soloinfo[z] = $(element).text();
                });
                z++;
                $("#content > table > tbody > tr:nth-child(" + x + ") > td:nth-child(2) > a").each((index, element) => {
                    soloinfo[z] = $(element).text();
                });
                z++;
                $("#content > table > tbody > tr:nth-child(" + x + ") > td:nth-child(3)").each((index, element) => {
                    soloinfo[z] = $(element).text();
                });
                z++;
                $("#content > table > tbody > tr:nth-child(" + x + ") > td:nth-child(4)").each((index, element) => {
                    soloinfo[z] = $(element).text();
                });
                z++;
            }
        
            const statsEmbed2 =
            {
                "type": "rich",
                "title": "Top 7 Solo Kills",
                "description": "",
                "color": color,
                "fields": [
                    {
                        "name": '# Name',
                        "value": soloinfo[0] + ' [' + soloinfo[1].trim() + '](https://herald.atlasfreeshard.com/playerstat.php?player_name=' + soloinfo[1].substr(0, soloinfo[1].indexOf(' ')) + ')',
                        "inline": true
                    },
                    {
                        "name": 'Class/Race',
                        "value": soloinfo[2],
                        "inline": true
                    },
                    {
                        "name": 'Kills',
                        "value": soloinfo[3],
                        "inline": true
                    },
                    {
                        "name": '\u200b',
                        "value": soloinfo[4] + ' [' + soloinfo[5].trim() + '](https://herald.atlasfreeshard.com/playerstat.php?player_name=' + soloinfo[5].substr(0, soloinfo[5].indexOf(' ')) + ')',
                        "inline": true
                    },
                    {
                        "name": '\u200b',
                        "value": soloinfo[6],
                        "inline": true
                    },
                    {
                        "name": '\u200b',
                        "value": soloinfo[7],
                        "inline": true
                    },
                    {
                        "name": '\u200b',

                        "value": soloinfo[8] + ' [' + soloinfo[9].trim() + '](https://herald.atlasfreeshard.com/playerstat.php?player_name=' + soloinfo[9].substr(0, soloinfo[9].indexOf(' ')) + ')',
                        "inline": true
                    },
                    {
                        "name": '\u200b',
                        "value": soloinfo[10],
                        "inline": true
                    },
                    {
                        "name": '\u200b',
                        "value": soloinfo[11],
                        "inline": true
                    },
                    {
                        "name": '\u200b',
                        "value": soloinfo[12] + ' [' + soloinfo[13].trim() + '](https://herald.atlasfreeshard.com/playerstat.php?player_name=' + soloinfo[13].substr(0, soloinfo[13].indexOf(' ')) + ')',
                        "inline": true
                    },
                    {
                        "name": '\u200b',
                        "value": soloinfo[14],
                        "inline": true
                    },
                    {
                        "name": '\u200b',
                        "value": soloinfo[15],
                        "inline": true
                    },
                    {
                        "name": '\u200b',
                        "value": soloinfo[16] + ' [' + soloinfo[17].trim() + '](https://herald.atlasfreeshard.com/playerstat.php?player_name=' + soloinfo[17].substr(0, soloinfo[17].indexOf(' ')) + ')',
                        "inline": true
                    },
                    {
                        "name": '\u200b',
                        "value": soloinfo[18],
                        "inline": true
                    },
                    {
                        "name": '\u200b',
                        "value": soloinfo[19],
                        "inline": true
                    },
                    {
                        "name": '\u200b',
                        "value": soloinfo[20] + ' [' + soloinfo[21].trim() + '](https://herald.atlasfreeshard.com/playerstat.php?player_name=' + soloinfo[21].substr(0, soloinfo[21].indexOf(' ')) + ')',
                        "inline": true
                    },
                    {
                        "name": '\u200b',
                        "value": soloinfo[22],
                        "inline": true
                    },
                    {
                        "name": '\u200b',
                        "value": soloinfo[23],
                        "inline": true
                    },
                    {
                        "name": '\u200b',
                        "value": soloinfo[24] + ' [' + soloinfo[25].trim() + '](https://herald.atlasfreeshard.com/playerstat.php?player_name=' + soloinfo[21].substr(0, soloinfo[25].indexOf(' ')) + ')',
                        "inline": true
                    },
                    {
                        "name": '\u200b',
                        "value": soloinfo[26],
                        "inline": true
                    },
                    {
                        "name": '\u200b',
                        "value": soloinfo[27],
                        "inline": true
                    },
                ],
                "url": `https://herald.atlasfreeshard.com/index.php?show=top_solo_kills`
            }
            channel.send({ embed: statsEmbed2 });
        }

        main2();
    }
});

client.login(DiscordBotToken)
