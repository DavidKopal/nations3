const basegame = {
    descriptor: {
        Mod: "Base",
        Author: "DKopal",
        Description: "The base cultures, countries, governments, and localisation for the game."
    },
    traits: {
        high_gdp_limit: {
            gdp_limit: 10000,
        },
        gold_mine: {
            base_production: 4
        },
        example: {
            base_production: 1,
            base_taxes: 1,
            base_mil: 1,
            gdp_limit: 1
        },
        military_leader: {
            base_mil: 3,
            aggresion: 0.175
        },
        administrative_leader: {
            base_taxes: 2,
            base_mil: 1,
            base_production: 1,
            gdp_limit: 150
        },
        economical_leader: {
            base_taxes: 1,
            base_production: 3,
            gdp_limit: 200
        },
    },
    cultures: {
        slavic: {
            names: ["David", "Dawid", "Lukas", "Marie"],
            dynasties: ["Jagiellon", "Premyslid", "Rurikid", "Piast"],
            base_production: 3,
            base_taxes: 1,
            base_mil: 2,
            commoners: ["Kowal", "Mlynarz", "Rybak", "Chlebek", "Stolar", "Piekarz"],
        },
        germanic: {
            names: ["Johan", "Sigurd", "Freydis", "Baldric"],
            dynasties: ["Wolfric", "Ehrenwald", "Hohenzollern", "Welf"],
            base_production: 1,
            base_taxes: 3,
            base_mil: 3,
            commoners: ["Schmidt", "Müller", "Bauer", "Koch", "Fischer", "Schneider"],
        },
        anglo: {
            names: ["David", "John", "Thomas", "Maria"],
            dynasties: ["Wolfric", "Ehrenwald", "Plantagenet", "Tudor"],
            base_production: 2,
            base_taxes: 3,
            base_mil: 2,
            commoners: ["Smith", "Carter", "Cooper", "Taylor", "Miller", "Baker"],
        },
        hunnic: {
            names: ["Attila", "Bleda", "Ruga", "Csaba"],
            dynasties: ["Dulo", "Arpad", "Csák", "Taksonyid"],
            base_production: 1,
            base_taxes: 1,
            base_mil: 4,
            commoners: ["Nagy", "Kovács", "Szabo", "Molnár", "Horváth", "Farkas"],
        },
        french: {
            names: ["Louis", "Charles", "Jean", "Philippe"],
            dynasties: ["Valois", "Bourbon", "Capet", "Orléans"],
            base_production: 1,
            base_taxes: 3,
            base_mil: 2,
            commoners: ["Martin", "Petit", "Durand", "Moreau", "Lefèvre", "Bernard"],
        },
        iberian: {
            names: ["Fernando", "Isabel", "Juan", "Maria"],
            dynasties: ["Trastámara", "Jiménez", "Avis", "Habsburg"],
            base_production: 2,
            base_taxes: 3,
            base_mil: 2,
            commoners: ["García", "Fernández", "López", "Martínez", "Pérez", "Sánchez"],
        },
        italian: {
            names: ["Lorenzo", "Giovanni", "Francesca", "Lucrezia"],
            dynasties: ["Medici", "Sforza", "Visconti", "Borgia"],
            base_production: 3,
            base_taxes: 2,
            base_mil: 2,
            commoners: ["Rossi", "Bianchi", "Grasso", "Ferrari", "Colombo", "Conti"],
        },
        nordic: {
            names: ["Erik", "Knut", "Astrid", "Ingrid"],
            dynasties: ["Yngling", "Stenkil", "Fairhair", "Gyllenstierna"],
            base_production: 1,
            base_taxes: 1,
            base_mil: 3,
            commoners: ["Eriksson", "Olafsson", "Andersson", "Sigurdsson", "Magnusdottir", "Torvaldsson"],
        },
        turkic: {
            names: ["Osman", "Mehmet", "Selim", "Fatma"],
            dynasties: ["Osmanli", "Seljuk", "Karamanid", "Timurid"],
            base_production: 3,
            base_taxes: 1,
            base_mil: 3,
            commoners: ["Demirci", "Kaya", "Çoban", "Yazici", "Aksakal", "Topal"],
        },
        arabic: {
            names: ["Ahmad", "Yusuf", "Fatima", "Aisha"],
            dynasties: ["Mamluk", "Rashidun", "Umayyad", "Abbasid"],
            base_production: 2,
            base_taxes: 1,
            base_mil: 4,
            commoners: ["Al-Haddad", "Al-Najjar", "Al-Tahir", "Al-Sayeed", "Al-Rumi", "Ibn-Salim"],
        },
    },
    nations: {
        BOH: {
            color: [255, 0, 0],
            base_production: 2,
            base_taxes: 1,
            base_mil: 2,
            land: 6,
            aggresion: 0.3,
            government: "kingdom",
            culture: "slavic",
        },
        SAX: {
            color: [200, 200, 18],
            base_production: 1,
            base_taxes: 2,
            base_mil: 3,
            land: 4,
            aggresion: 0.3,
            government: "duchy",
            culture: "germanic",
        },
        HUN: {
            color: [120, 160, 40],
            base_production: 1,
            base_taxes: 1,
            base_mil: 4,
            land: 15,
            aggresion: 0.3,
            government: "kingdom",
            culture: "hunnic",
        },
        FRA: {
            color: [5, 5, 180],
            base_production: 1,
            base_taxes: 3,
            base_mil: 2,
            land: 14,
            aggresion: 0.3,
            government: "kingdom",
            culture: "french",
        },
        ENG: {
            color: [180, 0, 0],
            base_production: 2,
            base_taxes: 2,
            base_mil: 3,
            land: 12,
            gdp: 11,
            government: "kingdom",
            culture: "anglo",
        },
        POL: {
            color: [220, 20, 60],
            base_production: 2,
            base_taxes: 1,
            base_mil: 3,
            land: 13,
            gdp: 9,
            government: "kingdom",
            culture: "slavic",
        },
        TUR: {
            color: [10, 80, 20],
            base_production: 3,
            base_taxes: 1,
            base_mil: 3,
            land: 18,
            gdp: 12,
            government: "sultanate",
            culture: "turkic",
        },
        CAS: {
            color: [255, 215, 0],
            base_production: 2,
            base_taxes: 3,
            base_mil: 2,
            land: 10,
            aggresion: 0.3,
            government: "kingdom",
            culture: "iberian",
        },
        VEN: {
            color: [90, 0, 90],
            base_production: 3,
            base_taxes: 2,
            base_mil: 2,
            land: 3,
            gdp: 11,
            government: "merchant_republic",
            culture: "italian",
        },
        SWE: {
            color: [0, 102, 204],
            base_production: 1,
            base_taxes: 1,
            base_mil: 3,
            land: 11,
            gdp: 9,
            government: "kingdom",
            culture: "nordic",
        },
        MAM: {
            color: [90, 90, 60],
            base_production: 2,
            base_taxes: 1,
            base_mil: 4,
            land: 16,
            aggresion: 0.3,
            government: "sultanate",
            culture: "arabic",
        },
    },
    governments: {
        duchy: {
            base_production: 1,
            base_taxes: 1,
            base_mil: 1,
            term: 0, // 0 = Non-elective, -1 = Rule for life, 1 or more = elective in years
            prefix: "Duchy of",
            title: "Duke"
        },
        kingdom: {
            base_production: 1,
            base_taxes: 2,
            base_mil: 2,
            term: 0,
            prefix: "Kingdom of",
            title: "King"
        },
        sultanate: {
            base_production: 1,
            base_taxes: 1,
            base_mil: 3,
            term: 0,
            prefix: "Sultanate of",
            title: "Sultan"
        },
        merchant_republic: {
            base_production: 4,
            base_taxes: 3,
            base_mil: 1,
            term: 4,
            prefix: "Serene Republic of",
            title: "Doge"
        },
        republic: {
            base_production: 2,
            base_taxes: 3,
            base_mil: 2,
            term: 6,
            prefix: "Republic of",
            title: "President"
        }
    },
    history: [
        new Event(1453, () => {
            if (RunningGame.ntags.includes("TUR")) {
                RunningGame.Log("Fall of Constantinople.")
                RunningGame.Game.nations.TUR.land += 2
            }
        }),
        new Event(1469, () => {
            if (RunningGame.ntags.includes("CAS")) {
                RunningGame.Log("Marriage between Castille and Aragon, forming the Kingdom of Spain.")
                RunningGame.localisation.CAS = "Spain"
                RunningGame.Game.nations.CAS.land += 9
            }
        }),
        new Event(1515, () => {
            if (RunningGame.ntags.includes("VEN") && RunningGame.ntags.includes("FRA")) {
                RunningGame.Log("Battle of Marignano between France and Venice. France consolidates power in Northern Italy.")
                RunningGame.Game.nations.VEN.land -= 2
                RunningGame.Game.nations.FRA.land += 5
            }
        }),
        new Event(1526, () => {
            if (RunningGame.ntags.includes("HUN") && RunningGame.ntags.includes("TUR")) {
                RunningGame.Log("Battle of Mohács between Hungary and the Ottomans. Partition of Hungary between the Ottomans and the Habsburgs.")
                RunningGame.Game.nations.HUN.land -= 4
                RunningGame.Game.nations.TUR.land += 4
            }
        }),
        new Event(1558, () => {
            if (RunningGame.ntags.includes("FRA")) {
                RunningGame.Log("The French Wars of Religion cause France to destabilise and lose GDP and split.")
                RunningGame.Game.nations.FRA.land -= 3
                RunningGame.Game.nations.FRA.gdp -= Math.floor(RunningGame.Game.nations.FRA.gdp * 0.35)
            }
        }),
        new Event(1588, () => {
            if (RunningGame.ntags.includes("CAS") && RunningGame.ntags.includes("ENG")) {
                RunningGame.Log("Defeat of the Spanish Armada. A huge victory for England.")
                RunningGame.Game.nations.CAS.land -= 2
                RunningGame.Game.nations.ENG.land += 2
            }
        }),
        new Event(1591, () => {
            if (RunningGame.ntags.includes("FRA")) {
                RunningGame.Log("The French Wars of Religion finally end and France manages to stablise again.")
                RunningGame.Game.nations.FRA.land += 3
                RunningGame.Game.nations.FRA.gdp += Math.floor(RunningGame.Game.nations.FRA.gdp * 0.35)
            }
        }),
        new Event(1651, () => {
            if (RunningGame.ntags.includes("ENG")) {
                RunningGame.Log("The English Civil war causes England to temporarily become a republic.")
                RunningGame.Game.nations.ENG.government = "republic"
                RunningGame.Game.nations.ENG.leader = ["Oliver Cromwell", "Oliver", "Cromwell", 49]
                RunningGame.Game.nations.ENG.next = -1
            }
        }),
        new Event(1660, () => {
            if (RunningGame.ntags.includes("ENG")) {
                RunningGame.Log("England reverts back to being a monarchy after 7 years of being under Cromwell's rule.")
                RunningGame.Game.nations.ENG.government = "kingdom"
                RunningGame.Game.nations.ENG.leader = ["Charles Stuart", "Charles", "Stuart", 29]
                RunningGame.Game.nations.ENG.next = 0
            }
        }),
    ],
    localisation: {
        // nations
        BOH: "Bohemia",
        SAX: "Saxony",
        HUN: "Hungary",
        FRA: "France",
        ENG: "England",
        POL: "Poland",
        TUR: "Ottomans",
        CAS: "Castile",
        VEN: "Venice",
        SWE: "Sweden",
        MAM: "Mamluks",

        // cultures
        slavic: "Slavic",
        germanic: "Germanic",
        anglo: "Anglo",
        hunnic: "Hunnic",
        french: "French",
        iberian: "Iberian",
        italian: "Italian",
        nordic: "Nordic",
        turkic: "Turkic",
        arabic: "Arabic",

        // govs
        duchy: "Duchy",
        kingdom: "Kingdom",
        sultanate: "Sultanate",
        merchant_republic: "Merchant Republic",

        // traits
        economical_leader: "Economical Leader",
        administrative_leader: "Administrative Leader",
        military_leader: "Military Leader",
    }
}


RunningGame.LoadMod(basegame)
