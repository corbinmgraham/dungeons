var nlp = require("wink-nlp-utils");





export function generate_game(story) {
    var name = nlp.string.extractPersonsName(story);
    console.log( name ); 
    return "";
}
