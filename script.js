function body_print(src) {
    main = document.getElementById("main");
    main.innerHTML = src;
}
function generate_buttons(buttons) {
    area = document.getElementById("button_area");
    area.innerHTML = "";
    for(let button of buttons) {
        btn = document.createElement('action');
        btn.innerHTML = "<button id='action'>" + button + "</button>";
        // btn = "<button id='action'>" + button + "</button>";
        area.append(btn);
    }
}
function generate_body(name, buttons) {
    n = document.getElementById("name");
    n.innerHTML = name;
    generate_buttons(buttons);
}

function get_action() {
    return new Promise((resolve) => {
        document.addEventListener('click', function(e) {
            // e.target.id === 'action'
            val = e.target.innerText;
            console.log(val)
            resolve(val);
        }, {once: true});
    });
}

function randomIndex(max) {
    return Math.floor(Math.random() * max);
}

// General Character (Player & Enemy) Attributes
const CharacterAttributes = [
    'name',
    'background',
    // Basic Attributes
    'level',
    'xp',
    'hp',
    // Battle Attributes
    'strength',
    'intelligence',
    'wisdom',
    // Battle Items
    'weapon',
    'armor',
    'skills',
    // Character Actions
    'actions'
]
// Player-Specific Attributes
const PlayerAttributes = [
    // Non-Modifiable
    'name',
    'role',
    'background',
    // Basic Attributes
    'level',
    'xp',
    'hp',
    // Battle Attributes
    'strength',
    'intelligence',
    'wisdom',
    // Battle Items
    'weapon',
    'armor',
    'skills',
    // Character Actions
    'actions'
]
// Player-Specific Actions
const PlayerActions = [
    'Attack',
    'Inventory',
    'Exit'
]

class Turn
{
    Character;
    constructor(Character) {
        this.Character = Character;
    }
    getTurn() {
        return this.Character.move();
    }
}

class Game
{
    Players;
    Enemies;
    Turns;
    display;
    constructor(Players, Enemies) {
        this.Players = Players;
        this.Enemies = Enemies;
        this.Turns = [];
        this.generate_game();
    }
    async generate_game() {
        for(p of this.Players) {
            this.Turns.push(p);
        }
        for(e of this.Enemies) {
            this.Turns.push(e);
        }
        await this.play();
        generate_body("Game Over", []);
        body_print("Game is over.");
    }
    async play() {
        let p = this.Players[0];
        let pn = p.getAttribute('name');
        let title = p.printAttributes();
        generate_body(title, PlayerActions);
        let ret, action, e;
        while(true) {
            let ret = "Action: ";
            for(let t of this.Turns) {
                if (t.c_type === 'Player') {
                    action = await get_action();
                    if (action === 'Exit') return;
                    
                    e = this.Enemies[0];
                    t.move(action, e);
                    // TODO: Implement Move -> Do Action

                } else {
                    generate_body(title, ['Continue']);
                    while(true) {
                        action = await get_action();
                        if (action === 'Continue') break;
                    }
                }

                ret += pn + " " + action + " "  + e;
                body_print(ret);
                generate_body(title, PlayerActions);
                ret = "Action: ";
            }
        }
    }
}

class Feature
{
    // Dictionary of Attributes
    Attributes;

    /**
     * 
     * @param {Dictionary} Attributes Attributes and their Accessor
     */
    constructor(Attributes) {
        this.Attributes = Attributes;
    }
    /**
     * 
     * @param {String} attr Attribute
     * @returns Attribute
     */
    getAttribute(attr) {
        if (attr in this.Attributes) return this.Attributes[attr];
        return null;
    }

    listAttributes() {
        return this.Attributes;
    }

    printAttributes() {
        let str = "";
        for(let name in this.Attributes) {
            let attr = this.Attributes[name];
            if(typeof(attr) === 'object') {
                str += attr.printAttributes();
            } else {
                str += name + ": " + attr;
            }
            str += " | ";
        }
        return str;
    }
}

class Character extends Feature
{
    c_type;
    constructor(Attributes) {
        super(Attributes);
    }
    move() {
        console.log("move");
        return "Attack";
    }
    attack(Target) {
        const weapon = this.getAttribute('weapon');
        const dmg = weapon.getAttribute('damage');
        weapon.damage(dmg, Target);
    }
}

class Player extends Character
{
    constructor(Attributes) {
        super(Attributes);
        super.c_type = "Player";
    }
    async move(action, Enemy) {
        switch (action) {
            case 'Attack':
                    let weapon = this.getAttribute('weapon');
                    generate_buttons(weapon.listAttributes());
                    action = await get_action();
                break;
        }
    }
}

class Enemy extends Character
{
    constructor(Attributes) {
        super(Attributes);
        super.c_type = "Enemy";
    }
 }

class Weapon extends Feature
{
    constructor(Attributes) {
        super(Attributes);
    }
    listAttributes() {
        ret = [];
        for(attr in this.Attributes['attacks']) {
            ret.append(this.Attributes[attr]);
        }
    }
    printAttributes() {
        return this.getAttribute('name');
    }
    damage(damage, Target) {
        Target.getAttribute('hp') -= Weapon.getAttribute('damage');
    }
}

class Armor extends Feature
{
    constructor(Attributes) {
        super(Attributes);
    }
}

function main() {
    w_attr = {
        'name': 'SuperSword',
        'attacks': [
            {
                'name': 'poop',
                'damage': 100
            }
        ]
    }
    w = new Weapon(w_attr);
    p_attr = {
        'name': 'Bob',
        'role': 'Matchmaker',
        'weapon': w,
        'hp': 200
    }
    e_attr = {
        'name': 'Steve',
        'role': 'Enemy',
        'weapon': w,
        'hp': 200
    }
    p = new Player(p_attr);
    e = new Enemy(e_attr);
    g = new Game([p], [e]);
}