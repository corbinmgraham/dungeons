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
        let pn = this.Players[0].getAttribute('name');
        generate_body(pn, PlayerActions);
        while(true) {
            for(let t of this.Turns) {
                if (t.c_type === 'Player') {
                    let action = await get_action();
                    if (action === 'Exit') return;

                    let e = this.Enemies[0].getAttribute('name');
    
                    let ret = "Action: " + p + " " + action + " "  + e;
                    body_print(ret);
                } else {
                    let ea = ['Continue'];
                    ea = ea.concat(PlayerActions);
                    generate_body(pn, ea);
                    while(true) {
                        let action = await get_action();
                        if (action === 'Continue') break;
                    }
                }
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
}

class Character extends Feature
{
    c_type;
    constructor(Attributes) {
        super(Attributes);
    }
    move() {

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
    damage(damage, Target) {
        Target.getAttribute('hp') -= Weapon.getAttribute('damage');
    }
}

function main() {
    w_attr = {
        'damage': 100
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