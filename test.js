const request = require("request-promise");
const cheerio = require("cheerio");
const charinfo = []



async function main() {
    const result = await request.get("https://herald.atlasfreeshard.com/playerstat.php?player_name=teehehehe");
    const $ = cheerio.load(result);

//finds name but it changes location name changes based on which realm
    if ($("#content > table > tbody > tr.herald_bg_1") != undefined) { 
    $("#content > table > tbody > tr.herald_bg_1").each((index, element) => {
        charinfo[1] = $(element).text();
    });
    }

    if ($("#content > table > tbody > tr.herald_bg_2") != undefined) { 
    $("#content > table > tbody > tr.herald_bg_2").each((index, element) => {
    charinfo[1] = $(element).text();
    });
    }

    if ($("#content > table > tbody > tr.herald_bg_3") != undefined) { 
    $("#content > table > tbody > tr.herald_bg_3").each((index, element) => {
    charinfo[1] = $(element).text();
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
            charinfo[3]="Guildless"
    });
//end guild name
// removes the invisible characters &nsbp
    $("#content > table > tbody > tr:nth-child(7) > td:nth-child(2)").each((index, element) => {
        charinfo[4]= $(element).text();
    });
//end rank on the server
    $("#content > table > tbody > tr:nth-child(9) > td:nth-child(2)").each((index, element) => {
        charinfo[5]= $(element).text();
    })
//end rank in the class
    $("#content > table > tbody > tr:nth-child(11) > td:nth-child(2)").each((index, element) => {
        charinfo[6]= $(element).text();
    })
//end total player kills
    $("#content > table > tbody > tr:nth-child(19) > td:nth-child(2)").each((index, element) => {
        charinfo[7]= $(element).text();
    })
//end total solo kills
    $("#content > table > tbody > tr:nth-child(15) > td:nth-child(2)").each((index, element) => {
        charinfo[8]= $(element).text();
    })
//end total deathblows
  charinfo[1]=charinfo[1].replace(/\u00a0/g, ""); 
//end
//forms our output can use any of the variable in any order "\n" is new line can also do " " for space etc
  const myoutput =charinfo[1] + "\n" + charinfo[2] + "\n" + charinfo[3] + "\n" + charinfo[4] + "\n" + charinfo[5] + "\n" + charinfo[6] + "\n" + charinfo[7] + "\n" + charinfo[8]
//end variable

  console.log(myoutput)
}

main();
