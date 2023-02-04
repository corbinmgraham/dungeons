function body_print(src) {
    main = document.getElementById("main");
    main.innerHTML = src;
}
function generate_buttons(buttons) {
    area = document.getElementById("button_area").innerHTML;
    area = "";
    
    for(let button of buttons) {
        area.innerHTML += "<button id='action'>" + button + "</button>";
    }
}
function generate_body(name, buttons) {
    n = document.getElementById("name");
    n.innerHTML = name;
    generate_buttons(buttons);
}

function get_action() {
    let _wait = true;

    
    
    while(_wait) {};

    return action;
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
    'Inventory'
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
    generate_game() {
        for(p of this.Players) {
            this.Turns.push(p);
        }
        for(e of this.Enemies) {
            this.Turns.push(e);
        }
        this.play();

    }
    play() {
        for(let t of this.Turns) {
            let p = t.getAttribute('name');
            generate_body(p, PlayerActions);

            let action = get_action();

            // let action = t.move();
            let e = action.getTarget();
            
        }
        ret = "Action: " + p + " " + action + " "  + e;
        body_print(ret);
    }
    // display() {
    //     ret = "";
    //     ret += 
    //     return ret;
    // }
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
    }
}

class Enemy extends Character
{
    constructor(Attributes) {
        super(Attributes);
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
        'role': 'Matchmaker',
        'weapon': w,
        'hp': 200
    }
    p = new Player(p_attr);
    e = new Enemy(e_attr);
    g = new Game([p], [e]);
}