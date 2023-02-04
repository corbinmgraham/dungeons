var nlp = require("wink-nlp-utils");



// Game->Characters[Player] / Enemy
class Game
{
    Characters;
    constructor(Characters) {
        this.Characters = Characters;
        console.log(this.Characters);
        localStorage.setItem('playerName', this.Characters[0].name)
        localStorage.setItem('playerWeapon', this.Characters[0].Weapons[0].name)
        localStorage.setItem('playerWeaponDamage', this.Characters[0].Weapons[0].damage)
        localStorage.setItem('playerTraits', this.Characters[0].Traits)
        localStorage.setItem('playerHealth', 100)

        localStorage.setItem('enemyName', this.Characters[1].name)
        localStorage.setItem('enemyWeapon', this.Characters[1].Weapons[0].name)
        localStorage.setItem('enemyWeaponDamage', this.Characters[1].Weapons[0].damage)
        localStorage.setItem('enemyTraits', this.Characters[1].Traits)
        localStorage.setItem('enemyHealth', 100)

    }
}
class Character
{
    name;
    Traits;
    Weapons;
    constructor(name, Weapons, Traits) {
        this.name = name;
        this.Traits = Traits;
        this.Weapons = Weapons;
    }
}
class Player extends Character
{
    constructor(name, Weapons, Traits) {
        super(name, Weapons, Traits);
    }
}

class Enemy extends Character
{
    constructor(name, Weapons, Traits) {
        super(name, Weapons, Traits);
    }
}


export function generate_game(story) {
    //comment out to test your own story or keep this story variable in to see what it can do
    //If you leave this story var in you can simply press start and our program will run a rough demo :)
    story = "The hero Steve Brown is a mage with a Super Sword that does 100 damage and his story is long. Bill Nye is a Flying Dragon with Fire Breath that does 200 Damage and his story is longer.";
    //
    //
    var char;
    let sentences = nlp.string.sentences( story )
    let name = "Player";
    let Type = Character;
    let chars = [];
    for(let sentence of sentences) {
        let attr = nlp.string.extractRunOfCapitalWords(sentence);
        console.log(attr);
        name = attr[0];
        attr.splice(0,1);
        console.log("Name: " + name);
        if (sentence.includes('hero')) {
            Type = Player;
        } else {
            Type = Enemy;
        }
        // let traits = [];
        let weapons = [];
        let tokens = nlp.string.tokenize(sentence, true);
        let i = 0;
        for (let val of tokens) {
            if(val['tag'] === 'number') {
                let e = {};
                e['name'] = attr[i];
                e['damage'] = val['value'];
                weapons.push(e);
                attr.splice(i,1);
                i++;
            }
        }
        char = new Type(name, weapons, attr);
        chars.push(char);
        // let t = nlp.tokens.removeWords();
        console.log("Tokens: ", tokens);
    }
    const game = new Game(chars);

    console.log( name ); 
    return "";
}
