'use strict';

// console.log(document.querySelector(`.message`).textContent);
// document.querySelector(".message").textContent = "Correct number!";

// document.querySelector(".number").textContent = 13;
// document.querySelector(".score").textContent = 10;

// document.querySelector(".guess").value = 10;
// console.log(document.querySelector(".guess").value);

    // } else if (guess > secretNumber) { // guess too high
    //     if (score > 1) {
    //         document.querySelector(".message").textContent = "📈 Too High!";
    //         wrongNumber();
    //     } else {
    //         gameLost();
    //     }
    // } else if (guess < secretNumber) { // guess too low
    //     if (score > 1) {
    //         document.querySelector(".message").textContent = "📉 Too Low!";
    //         wrongNumber();
    //     } else {
    //         gameLost();
    //     }

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function(message) {
    document.querySelector(".message").textContent = message;
}

const displayScore = function(score) {
    document.querySelector(".score").textContent = score;
}

// Checkbox functionality
document.querySelector(".check").addEventListener("click", function() {
    const guess = Number(document.querySelector(".guess").value);
    console.log(guess, typeof guess);

    // Helper function to update the score
    function wrongNumber() {
        score--;
        displayScore(score);
    }

    // Helper function to update the message and score when score reaches 0
    function gameLost() {
        displayMessage("😢 You Lost the Game!");
        displayScore(0);
    }

    // Input the message based on the input
    if (!guess) { // no input
        displayMessage("❌ No Number!");
    } else if (guess !== secretNumber) { // guess too high
        if (score > 1) {
            displayMessage(guess > secretNumber ? "📈 Too High!" : "📉 Too Low!");
            wrongNumber();
        } else {
            gameLost();
        }
    } else { // correct guess
        displayMessage("✅ Correct Number!");
        document.querySelector(".number").textContent = secretNumber;

        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "30rem";

        if (score > highScore) {
            highScore = score;
            document.querySelector(".highscore").textContent = highScore;
        }
    }
});

// Reset functionality
document.querySelector(".again").addEventListener("click", function() {
    // Restore initial values of score and secretNumber
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    // Restore the initial conditions of the message, number, score and guess input fields
    displayMessage("Start guessing...");
    document.querySelector(".number").textContent = "?";
    displayScore(score);
    document.querySelector(".guess").value = "";

    // Restore the original background color (#222) and number width (15rem)
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
})

