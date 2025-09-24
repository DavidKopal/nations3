const rpbsbase = {
    descriptor: {
        Mod: "Republic Expansion",
        Author: "DKopal",
        Description: "Adds 3 new government types and 4 new nations."
    },
    governments: {
        consulatory_republic: {
            base_production: 1,
            base_taxes: 2,
            base_mil: 3,
            term: 3,
            prefix: "Consulatory Republic of",
            title: "Consul"
        },
        federal_republic: {
            base_production: 2,
            base_taxes: 3,
            base_mil: 2,
            term: 8,
            prefix: "Federal Republic of",
            title: "Chancellor"
        },
        senate: {
            base_production: 2,
            base_taxes: 4,
            base_mil: 1,
            term: 0,
            prefix: "Senatory Republic of",
            title: ""
        },
        consulatory_senate: {
            base_production: 1,
            base_taxes: 3,
            base_mil: 4,
            term: 2,
            prefix: "Senatory-Consulatory Republic of",
            title: "The Senate and Consul"
        },
    },
    nations: {
        ROM: {
            color: [50, 50, 50],
            base_production: 1,
            base_taxes: 1,
            base_mil: 4,
            land: 7,
            aggresion: 0.3,
            government: "consulatory_senate",
            culture: "italian"
        },
        GLG: {
            color: [80, 80, 80],
            base_production: 1,
            base_taxes: 2,
            base_mil: 3,
            land: 6,
            aggresion: 0.3,
            government: "consulatory_republic",
            culture: "germanic"
        },
        BAV: {
            color: [150, 75, 0],
            base_production: 2,
            base_taxes: 2,
            base_mil: 2,
            land: 4,
            aggresion: 0.3,
            government: "republic",
            culture: "germanic"
        },
        GEN: {
            color: [0, 100, 0],
            base_production: 3,
            base_taxes: 3,
            base_mil: 2,
            land: 5,
            aggresion: 0.3,
            government: "federal_republic",
            culture: "italian"
        },
    },
    localisation: {
        ROM: "Roma",
        GLG: "Germanic League",
        BAV: "Bavarian Free Cities",
        GEN: "Genoa",
        republic: "Republic",
        consulatory_republic: "Consulatory Republic",
        federal_republic: "Federal Republic",
        senate: "Senate",
        consulatory_senate: "Senatory-Consulatory Republic"
    }

}

RunningGame.LoadMod(rpbsbase)
RunningGame.onUpdate((game) => {
    RunningGame.ntags.forEach(tag => {
        if (game.nations[tag].government == "senate") {
            game.nations[tag].leader = ["Senate", "", "", 0]
        }
    })
})
