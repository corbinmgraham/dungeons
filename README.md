# curl -y //hackers: 'dungeons' submission

### ⭐️ Quick Links: &nbsp; [Event](#2023-iowa-state-university-hackathon) &nbsp; | &nbsp; [Project](#dungeons) &nbsp; | &nbsp; [Team](#team) ⭐️

### 2023 Iowa State University Hackathon
**5:45PM Friday, February 3 &mdash; 2:00PM Saturday, February 4**

Teams compete in groups of up to 4 with 24 hours to bring a project from concept to reality.
Some hackathons have themes, this one was a complete free-for-all.
Teams were allowed total freedom to make whatever they want, no matter how big or small.
Many projects are far too large for the scope of the event but may be the beginning of something great.
This coding-frenzy allows students an opportunity to apply skills they've learning in their courses
to something that isn't for a grade.  For many student's it's likely their first time doing anything
on their own.  It's also a great opportunity for students to learn some new skill or talent
they'd never have the opportunity to otherwise.


## dungeons
Write a story in traditional D&D style;
then our app will convert this creative writing piece (written in plain English) to an interactive, playable game.

### Game Engine
dungeons uses 

Example Story:
```
There was once a land far far away that had a hero whom you may call Bill Nye that had a Laser Canon which did 10 damage and an Unworldly Amount of Talent. His adversary, Lord Farquad, would often Eat Cheese, inflicting a great deal of pain upon the champion of today's story often doing a measely 5 damage but fear not, for the lord posessed a Hairy Chest and Flawless Flow that swooned his victims.
```
How it's being processed:
1. Classify sentences from punctuation.
2. Tag each element of the sentence
(the classifier only goes as far as describing each element as a word, number, or punctuation)
3. The Game Engine will then classify the playable character from its trace-word, 'hero'.
4. The Game Engine will game engine will assing character traits if they are _Proper Nouns*_
5. The Game Engine will generate a game using each playable character, and enemy with their assigned traits.
Each character only has the traits which you have given it.

_*Proper Nouns are any sequence of 2 or more words that begin with a capitalized letter._

### Technologies
- winkJS: Word Classification using Natural Language Processing
- ~DALL-e Mini: Game-Image Generator~ _Due to payment issues, this is unavailable._

### Languages
- React.JS: Game Engine & Data Handler
- HTML: Interactive Interface

### Installing & Testing

Running this project can be difficult.
Hell, it gave us plenty of challenges.
Hopefully these will help.

#### Installing

##### Clone the repo.
```
git clone https://github.com/corbinmgraham/dungeons.git
```

##### Satisfy any dependencies
```
npm update && npm i
```

#### Running

```ts
npm run start:dev
```

#### Testing

npm should start a local server and open the page.
If npm fails to open the page, you can access it with `localhost:3000` (npm's default gateway).

Write your story and watch as it comes to life.

#### Issues
Please see [Game Engine](#Game--Engine) for formatting assistance.
Due to issues with the classifcation algorithm (blame Corbin), it's a bit wonky.


## A Funny Series of Events

- [12:00PM] Brainstorming ideas during class.
- [04:00PM] Tacos & more brainstorming.
- [05:45PM] Event begins.
- [06:00PM] Idea is finalized and we are ready to begin.
- [06:01PM] Nothing works.
- [11:00PM] Couldn't get the react server running for 4 hours.
- [03:00AM] Casually walked to the gas station for snacks and energy drinks
with temperatures below 0ºF.
- [05:00AM] First working prototype.
- [07:45AM] Had to uber to campus because the bus wasn't running yet.
- [10:00AM] First working prototype with all values hardcoded...
- [11:00AM] Began using NLP classifiers.
- [12:00PM] Presentation in 2 hours, nothing works.
- [01:00PM] Nothing works.
- [02:00PM] Presenting untested project.


## Team
**Team Name:** "curl -y //hackers"

The idea for the namecame to us because we both
have obnoxiously curly hair.
That, and we thought we'd be using 'curl' a lot.
Turns out, we didn't need to.  Lucky us.
npm sure can ruin your day but not like curl can.

### Vincent Zefran
**Freshman, Software Engineering**

**Role:** React professional, interfacing and data manipulation.

**Hobbies:** School is life.

**Quote of the Day:** "You only live twice."

### Corbin Graham
**Junior, Computer Science**

**Role:** React professional, interfacing and data manipulation.

**Hobbies:** Anything but coding.

**Quote of the Day:** "You can't make a bad decision if you don't make any."
