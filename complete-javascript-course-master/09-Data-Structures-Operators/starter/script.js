'use strict';

// Data needed for first part of the section
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};



///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
  [
  'Neuer',
  'Pavard',
  'Martinez',
  'Alaba',
  'Davies',
  'Kimmich',
  'Goretzka',
  'Coman',
  'Muller',
  'Gnarby',
  'Lewandowski',
  ],
  [
  'Burki',
  'Schulz',
  'Hummels',
  'Akanji',
  'Hakimi',
  'Weigl',
  'Witsel',
  'Hazard',
  'Brandt',
  'Sancho',
  'Gotze',
  ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
  'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
  team1: 1.33,
  x: 3.25,
  team2: 6.5,
  },
};

// Player arrays for both teams
const [players1, players2] = game.players;
console.log(players1, players2);

// Bayern players seperated to the goalkeeper and field players
const [gk, ...fieldPlayers] = players1
console.log(gk, fieldPlayers);

// All the players from both the teams
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// All the players that were on the field for Bayern München
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// Odds
const {team1, x: draw, team2} = game.odds
console.log(team1, draw, team2);

// Prints the scorers and the total number of scores
function printGoals(...scorers) {
  const len = scorers.length;
  for (let i = 0; i < len; i++) {
    console.log(scorers[i]);
  }
  console.log(len)
}

printGoals("Torres", "Gerrard", "Pukki");
printGoals(...game.scored);

// Print to the console which team is more likely to win
team1 < team2 && console.log("Team 1 is more likely to win");
team1 > team2 && console.log("Team 2 is more likely to win");


///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/


// Log the number of the goal and the scorer
for (const [idx, scorer] of game.scored.entries()) {
  console.log(`Goal ${idx+1}: ${scorer}`);
}

// Calculate the average of the odds and log it
let avg = 0;
const odds = Object.values(game.odds)
for (const odd of odds) {
  avg += odd;
}
console.log(avg / odds.length);

// Print the 3 odds to the console in a specially formatted way
for (const [team, odd] of Object.entries(game.odds)) {
  if (team === "x") {
    console.log(`Odd of draw: ${odd}`);
  } else {
    console.log(`Odd of victory ${game[team]}: ${odd}`);
  }
}

// Create a scorers object for each scorer and the amount of goals they scored
const scorers = {}
for (const scorer of game.scored) {
  scorers[scorer] ? scorers[scorer]++ : scorers[scorer] = 1
}
console.log(scorers);


///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// Unique events
const uniqueEvents = [...new Set(gameEvents.values())]
console.log(uniqueEvents);

// Remove unfair yellow card
gameEvents.delete(64)
console.log(gameEvents);

// Print how many events happened on average
console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes`);

// Log the events according to the half
for (const [time, event] of gameEvents) {
  const half = time < 45 ? "[FIRST HALF]" : "[SECOND HALF]"
  console.log(`${half} ${time}: ${event}`);
}

const announcement = "All passengers go to boarding door 23. Boarding door 23!"
console.log(announcement.replace(/door/g, "gate"));



///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/


document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector("button").addEventListener("click", function() {
  const text = document.querySelector('textarea').value;

  // Split into seperate lines when switching lines
  const lines = text.split("\n");

  // Clean the lines from white space and split it into two words
  const trimmed = lines.map(x => {return x.trim().split("_")})

  // Make the first words lower case and the second one capitalized
  const camelCase = trimmed.map(pair => {
    const [first, second] = pair
    return first.toLowerCase() + second.toLowerCase().replace(second[0].toLowerCase(), second[0].toUpperCase())
  })

  // Pad lines and add checkmarks according to the line index, log to the console
  const longest = Math.max(...camelCase.map(word => word.length))
  for (let i = 0; i < camelCase.length; i++) {
    const curr = camelCase[i]
    const check = "✅"
    console.log(curr.padEnd(longest + 3) + check.repeat(i+1));
  }
})


// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

function airportCode(code) {
  return code.slice(0,3).toUpperCase();
}

for (const flight of flights.split("+")) {
  const [type, from, to, time] = flight.split(";");
  const output = `${type.startsWith("_Delayed") ? '🔴' : ''}${type.replaceAll("_", " ")} from ${airportCode(from)} to ${airportCode(to)} (${time.replace(":", "h")})`;
  console.log(output);
}