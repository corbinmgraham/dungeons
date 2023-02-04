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
    constructor(Players, Enemies) {
        this.Players = Players;
        this.Enemies = Enemies;
        this.Turns = [];
        this.generate_game();
    }
    listCharacter(Type) {
        let chars = "";
        for(let char of Type) {
            chars += char.getAttribute('name') + " [" + char.getAttribute('hp') + "] ";
        }
        return chars;
    }
    async generate_game() {
        for(let p of this.Players) {
            this.Turns.push(p);
        }
        for(let e of this.Enemies) {
            this.Turns.push(e);
        }
        await this.play();
        generate_body("Game Over", []);
        body_print("Game is over.");
    }
    process_lang() {
        let str = "Corbin is a mage with a sword that does 100 damage and his story is long. Bill is a dragon with fire breath that does 200 damage and his story is longer.";
        let token = str.split(" ");
        console.log(token);
        let name = (function() {
            let idx = token.indexOf('.')+1;
            let n = token[idx];
            token.splice(idx,2);
            console.log(n);
            return n;
        })();
        let role = (function() {
            let idx = token.indexOf('is');
            let r = token[idx+2];
            token.splice(idx,2);
            if (token[idx+1] === 'a') {
                console.log(r);
                return r;
            }
            return "no";
        })();
        let weapon = (function() {
            let idx = token.indexOf('with') + 2;
            let name = token[idx];
            token.splice(idx-2,3);
            idx = token.indexOf('damage') - 1;
            let damage = token.pop(idx);
            token.splice(idx+1,1);
            console.log(token)
            return {
                'name': name,
                'damage': damage
            };
        })();
        console.log(weapon)
        
    }
    async play() {

        this.process_lang()
        return;

        let p = this.Players[0];
        let pn = p.getAttribute('name');
        let title = p.printAttributes();
        generate_body(title, PlayerActions);
        let ret, action, e;
        while(true) {
            let ret = "Action: ";
            for(let p of this.Turns) {
                if (p.c_type === 'Player') {
                    body_print("Targets: " + this.listCharacter(this.Enemies));
                    action = await get_action();
                    if (action === 'Exit') return;
                    e = this.Enemies[0];
                } else {
                    // Attack random player
                    e = this.Players[randomIndex(this.Players.length)];
                }

                let move = p.move(action, e);
                ret += p.getAttribute('name') + " " + move + " "  + e.getAttribute('name');
                body_print(ret);

                generate_body(title, ['Continue']);
                while(true) {
                    action = await get_action();
                    if (action === 'Continue') break;
                }

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
    move(action, Enemy) {
        console.log(action, Enemy);
        return "Attack";
    }
    async attack(Target) {
        weapon = this.getAttribute('weapon');
        generate_buttons(weapon.listAttributes());
        weapon = await get_action();
        return "done";
    }
}

class Player extends Character
{
    constructor(Attributes) {
        super(Attributes);
        super.c_type = "Player";
    }
    move(action, Enemy) {
        let weapon;
        switch (action) {
            case 'Attack':
                return this.attack(Enemy)
        }
        return "Unable to do action";
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
        let ret = [];
        for(let attack in this.Attributes['attacks']) {
            let item = attack['name'] + ": " + attack['damage'];
            ret.push(item);
        }
        return ret;
    }
    printAttributes() {
        return this.getAttribute('name');
    }
    damage(damage, Target) {
        Target.getAttribute('hp') -= damage;
    }
}

class Armor extends Feature
{
    constructor(Attributes) {
        super(Attributes);
    }
}

function main() {
    spell = {
        'type': 'heal',
        'val': 100
    }
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
        'inventory': [spell],
        'hp': 200
    }
    e_attr = {
        'name': 'Steve',
        'role': 'Enemy',
        'weapon': w,
        'hp': 200
    }
    p = new Player(p_attr);
    e1 = new Enemy(e_attr);
    g = new Game([p], [e1]);
}