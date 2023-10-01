'use strict';

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle("player--active")
    player1El.classList.toggle("player--active")
}

const init = function () {
    // Set playing state back to "playing"
    playing = true;

    // Set scores to 0
    currentScore = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    scores[0] = 0;
    scores[1] = 0;

    // Reset the color scheme
    diceEl.classList.add("hidden")
    player0El.classList.add("player--active")
    player1El.classList.remove("player--active")
    player0El.classList.remove("player--winner")
    player1El.classList.remove("player--winner")
}

// Initialize the game
init();

// Dice roll functionality
btnRoll.addEventListener("click", function() {
    if (playing) {
        // Generate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1
        console.log(dice);

        // Display the dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`

        // Check for rolled 1: if true, switch to next player
        if (dice !== 1) {
            currentScore += dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", function() {
    if (playing) {
        // Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if player's score is >= 100 
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active")
            diceEl.classList.add("hidden")
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener("click", init);