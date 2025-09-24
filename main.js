/* reminders for myself:
1. Add female titles


*/

class Event {
    constructor(date, fb) {
        this.date = date
        this.fb = fb
    }

    Exec(obj) {
        this.fb(obj)
    }
}

function rand(m, n) {
    return Math.floor(Math.random() * (n - m + 1) + m)
}

function winprob(p1, p2) {
    const k = 0.0415
    return 1 / (1 + Math.exp(-k * (p1 - p2)));
}

function rgbToHex(table) {
    let r = table[0].toString(16);
    let g = table[1].toString(16);
    let b = table[2].toString(16);

    if (r.length < 2) r = "0" + r;
    if (g.length < 2) g = "0" + g;
    if (b.length < 2) b = "0" + b;

    return "#" + r + g + b;
}

function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

function merge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                merge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return merge(target, ...sources);
}


class KeyHandlerClass {
    constructor() {
        this.keys = {}
    }

    Register(key, fb) {
        if (this.keys[key]) {
            this.keys[key].push(fb)
        } else {
            this.keys[key] = [fb]
        }
    }

    Handling(event) {
        let key = event.key.toLowerCase()
        if (this.keys[key]) {
            this.keys[key].forEach(fb => {
                fb()
            })
        }
    }
}

const KeyHandler = new KeyHandlerClass()

let ldmods = ["base_game"]
if (localStorage.getItem("mods")) {
    ldmods = JSON.parse(localStorage.getItem("mods"))
} else {
    localStorage.setItem("mods", '["base_game"]')
}

const ModLoader = {
    toggle() {
        const gui = document.getElementById('mod-loader')
        gui.classList.toggle('hidden')
    },

    add(event) {
        if (event.key === 'Enter') {
            const input = event.target
            const mod = input.value.trim()
            if (mod && !ldmods.includes(mod)) {
                ldmods.push(mod)
                localStorage.setItem("mods", JSON.stringify(ldmods))
                this.display()
                input.value = ''
            }
        }
    },

    display() {
        const list = document.getElementById('mod-list')
        list.innerHTML = ''
        ldmods.forEach(mod => {
            const li = document.createElement('li')
            li.textContent = mod
            li.className = "mod-li"
            li.onclick = () => {
                if (mod !== "base_game") {
                    ldmods = ldmods.filter(t => t !== mod)
                    localStorage.setItem("mods", JSON.stringify(ldmods))
                    this.display()
                }
            }
            list.appendChild(li)
        })
    }
}

class WolframEngine {
    constructor(startingyear = 1000) {
        this.Game = {}
        this.Chosen = null
        this.Game.Year = startingyear

        this.Stopped = true
        this.LoadedMods = []
        this.AreModsLoaded = false

        this.ModsLoaded = []
        this.perUpdate = []
    }

    OnModsLoaded(fb) {
        this.ModsLoaded.push(fb)
    }
    onUpdate(fb) {
        this.perUpdate.push(fb)
    }

    LoadMods(mods) {
        let pending = mods.length

        for (const mod of mods) {
            const scr = document.createElement("script")
            scr.src = "Mods/" + mod + ".js"

            scr.onload = () => {
                pending--
                if (pending === 0) {
                    this.AreModsLoaded = true
                    this.ModsLoaded.forEach(cb => cb())
                }
            }

            document.head.appendChild(scr)
        }
    }

    Log(event) {
        document.getElementById("event").textContent = "Recent event: " + event
    }

    LoadMod(base) {
        this.LoadedMods.push({ ...base.descriptor })
        delete base.descriptor
        this.Game = merge(this.Game, base)
        while (!this.Game.nations || !this.Game.cultures || !this.Game.localisation || !this.Game.governments || !this.Game.traits) {
            setTimeout(100, () => { })
        }
        this.localisation = this.Game.localisation
        this.ntags = Object.keys(this.Game.nations)
        for (let tag of this.ntags) {
            const nd = this.Game.nations[tag]

            this.Game.nations[tag].maxgdp = nd.land * 128

            if (!this.Game.nations[tag].treaties) {
                this.Game.nations[tag].treaties = []
            }

            if (!this.Game.nations[tag].next) {
                if (this.Game.governments[nd.government].term > 0) {
                    this.Game.nations[tag].next = this.Game.Year + this.Game.governments[nd.government].term
                } else {
                    this.Game.nations[tag].next = this.Game.governments[nd.government].term
                }
            }

            if (!this.Game.nations[tag].leader) {
                this.Game.nations[tag].leader = this.GenerateLeader(nd.culture)
            }

            if (!this.Game.nations[tag].traits) {
                this.Game.nations[tag].traits = []
            }

            if (!this.Game.nations[tag].gdp) {
                this.Game.nations[tag].gdp = 0
            }
        }
    }

    GenerateLeader(culture, past = undefined) {
        const name = this.Game.cultures[culture].names[rand(0, this.Game.cultures[culture].names.length - 1)]
        let dynasty
        if ((past && past != "commoners") && Math.random() <= 0.9) {
            dynasty = past
        } else if (past != "commoners") {
            dynasty = this.Game.cultures[culture].dynasties[rand(0, this.Game.cultures[culture].dynasties.length - 1)]
        } else if (past == "commoners") {
            dynasty = this.Game.cultures[culture].commoners[rand(0, this.Game.cultures[culture].commoners.length - 1)]
        }

        return [name + " " + dynasty, name, dynasty, rand(15, 25), [["military_leader", "administrative_leader", "economical_leader"][rand(0,2)]]]
    }

    CalculateProduction(tag) {
        const nd = this.Game.nations[tag]
        let total = nd.base_production + this.Game.cultures[nd.culture].base_production + this.Game.governments[nd.government].base_production + this.CalculateTraitModifiers(tag)[0]
        return total
    }

    CalculateTraitModifiers(tag) {
        const nd = this.Game.nations[tag]
        let total = [0, 0, 0, 0, 0] // production, taxes, mil, gdp limit, aggresion
        if (nd.traits.length > 0) {
            nd.traits.forEach(traitid => {
                const trait = this.Game.traits[traitid]
                total[0] += trait?.base_production || 0
                total[1] += trait?.base_taxes || 0
                total[2] += trait?.base_mil || 0
                total[3] += trait?.gdp_limit || 0
                total[4] += trait?.aggresion || 0
            })
        }
        if (nd.leader[4].length > 0) {
            nd.leader[4].forEach(traitid => {
                const trait = this.Game.traits[traitid]
                total[0] += trait?.base_production || 0
                total[1] += trait?.base_taxes || 0
                total[2] += trait?.base_mil || 0
                total[3] += trait?.gdp_limit || 0
                total[4] += trait?.aggresion || 0
            })
        }
        return total
    }

    CalculateTaxes(tag) {
        const nd = this.Game.nations[tag]
        let total = nd.base_taxes + this.Game.cultures[nd.culture].base_taxes + this.Game.governments[nd.government].base_taxes + this.CalculateTraitModifiers(tag)[1]
        return total
    }

    CalculateEarnings(tag) {
        const nd = this.Game.nations[tag]
        return Math.floor((this.CalculateProduction(tag) + this.CalculateTaxes(tag)) * (nd.land / 3)) + rand(-2, 2)
    }

    CalculateMil(tag) {
        const nd = this.Game.nations[tag]
        let total = nd.base_mil + this.Game.cultures[nd.culture].base_mil + this.Game.governments[nd.government].base_mil + this.CalculateTraitModifiers(tag)[2] + (nd.gdp * 0.05) + (nd.land * 3)
        return Math.floor(total) + rand(-3, 3)
    }

    CalculateAggresion(tag) {
        const nd = this.Game.nations[tag]
        return nd.aggresion + this.CalculateTraitModifiers(tag)[4]
    }

    Update() {
        if (this.Stopped) { return }
        this.Game.Year++
        document.getElementById("year").textContent = `Year: ${this.Game.Year}`
        const sdiv = document.getElementById("nations-object")
        sdiv.innerHTML = ""

        this.Game.history.forEach(evt => {
            if (evt.date == this.Game.Year) {
                evt.Exec(this)
            }
        })

        if (Math.random() <= 0.2 && this.ntags.length >= 2) {
            let agg = this.ntags[rand(0, this.ntags.length - 1)]
            let def = this.ntags[rand(0, this.ntags.length - 1)]
            while (def == agg || this.Game.nations[agg].treaties.includes(def)) { def = this.ntags[rand(0, this.ntags.length - 1)] }

            let milagg = this.CalculateMil(agg)
            let mildef = this.CalculateMil(def)
            let attack = false

            if (Math.random() > this.CalculateAggresion(agg)) {attack = true}

            if (attack && milagg > mildef) { this.Attack(agg, def) } else { this.Attack(def, agg) }
        }

        this.ntags.forEach(tag => {
            const nd = this.Game.nations[tag]
            if (!nd) { return }
            if (nd.land <= 0) {
                delete this.Game.nations[tag]
                this.ntags = this.ntags.filter(t => t !== tag)
                return
            }
            this.Game.nations[tag].maxgdp = (nd.land * 128) + + this.CalculateTraitModifiers(tag)[3]
            const yearnings = this.CalculateEarnings(tag)
            if (nd.gdp + yearnings > nd.maxgdp) {
                nd.gdp = nd.maxgdp
            } else {
                nd.gdp += yearnings
            }
            if (nd.gdp <= 0) {nd.gdp = 0}

            if (nd.next == this.Game.Year) {
                nd.leader = this.GenerateLeader(nd.culture, "commoners")
                nd.next += this.Game.governments[nd.government].term
            }

            nd.leader[3]++
            if ((nd.leader[3] > 60 && Math.random() < 0.05) || nd.leader[3] > 80) {
                if (nd.next == 0) {
                    nd.leader = this.GenerateLeader(nd.culture, nd.leader[2])
                } else if (nd.next == -1) {
                    nd.leader = this.GenerateLeader(nd.culture)
                }
            }

            const p = document.createElement("p")
            p.innerHTML = `<a class="white">${this.localisation[tag]}</a> | <a class="yellow">GDP: ${nd.gdp}</a> | <a class="yellow">Yearly: ${yearnings}</a> | <a class="green">Land: ${nd.land}</a> | <a class="green">Mil. Power: ${this.CalculateMil(tag)}</a>`
            p.style.backgroundColor = rgbToHex(nd.color)
            p.className = "nation-line"
            p.onclick = () => {
                this.Chosen = tag
            }
            sdiv.appendChild(p)
        })

        if (this.Chosen) {
            const nd = this.Game.nations[this.Chosen]
            document.getElementById("info-rtraits").innerHTML = ''
            document.getElementById("info-tag").textContent = "TAG: " + this.Chosen
            document.getElementById("info-name").textContent = "Name: " + this.localisation[this.Chosen]
            document.getElementById("info-fname").textContent = "Full Name: " + this.Game.governments[nd.government].prefix + " " + this.localisation[this.Chosen]
            document.getElementById("info-ruler").textContent = "Ruler: " + this.Game.governments[nd.government].title + " " + nd.leader[0] + " (" + nd.leader[3] + ")"
            nd.leader[4].forEach(trait => {
                const li = document.createElement("li")
                li.textContent = this.localisation[trait]
                li.style.paddingLeft = "1vw"
                document.getElementById("info-rtraits").appendChild(li)
            })
            document.getElementById("info-gov").textContent = "Government: " + this.localisation[nd.government]
            document.getElementById("info-agg").textContent = "Aggresion: " + this.CalculateAggresion(this.Chosen)
            if (nd.next > 0) {
                document.getElementById("info-next").style.display = "block"
                document.getElementById("info-next").textContent = "Next election: " + nd.next
            } else {
                document.getElementById("info-next").style.display = "none"
            }
        }
        for (let fb of this.perUpdate) {
            fb(this.Game)
        }
    }

    Attack(tag0, tag1) {
        const mil0 = this.CalculateMil(tag0)
        const mil1 = this.CalculateMil(tag1)

        const winchance = winprob(mil0, mil1)

        if (Math.random() <= winchance) {
            this.Game.nations[tag0].land++
            this.Game.nations[tag1].land--
            const gdploss = Math.floor(this.Game.nations[tag0].gdp * 0.2)
            this.Game.nations[tag0].gdp += gdploss
            this.Game.nations[tag1].gdp -= gdploss
            if (this.Game.nations[tag1].land == 0) {
                delete this.Game.nations[tag1]
                this.ntags = this.ntags.filter(t => t !== tag1)
            } else {
                this.Game.nations[tag0].treaties.push(tag1)
                this.Game.nations[tag1].treaties.push(tag0)
            }
        } else {
            this.Game.nations[tag0].land--
            this.Game.nations[tag1].land++
            const gdploss = Math.floor(this.Game.nations[tag1].gdp * 0.2)
            this.Game.nations[tag0].gdp -= gdploss
            this.Game.nations[tag1].gdp += gdploss
            if (this.Game.nations[tag0].land == 0) {
                delete this.Game.nations[tag0]
                this.ntags = this.ntags.filter(t => t !== tag0)
            } else {
                this.Game.nations[tag0].treaties.push(tag1)
                this.Game.nations[tag1].treaties.push(tag0)
            }
        }

        document.getElementById("event").textContent = "Recent event: " + this.localisation[tag0] + " declared war upon " + this.localisation[tag1]
    }

    Loop() {
        this.Update()
        setInterval(this.Update.bind(this), 1000)
    }

    PauseRun() {
        this.Stopped = !this.Stopped
    }
}

const RunningGame = new WolframEngine(1444)
RunningGame.LoadMods(ldmods)

document.addEventListener("DOMContentLoaded", () => {
    ModLoader.display()
    RunningGame.OnModsLoaded(() => {
        RunningGame.Loop()
    })
})

let started = false
KeyHandler.Register(" ", () => {
    if (!started) {
        document.getElementById("pressspace").remove()
        started = true
    }
    RunningGame.PauseRun()
})