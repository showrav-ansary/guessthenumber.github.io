'use strict';

let secretNumber;
let score;
let highScore = 0;
let roundCount = 0;
let winFlag = false;

const messageElement = document.querySelector('.message');
const scoreElement = document.querySelector('.score');
const roundElement = document.querySelector('.round');
const bodyElement = document.querySelector('body');
const highScoreElement = document.querySelector('.highscore');
const numberElement = document.querySelector('.number');

const againButton = document.querySelector('.again');
const checkButton = document.querySelector('.check');

function reset(scoreReset, setNewSecretNumber, lost) {
    if (!secretNumber || setNewSecretNumber) {
        messageElement.textContent = "Start guessing...";
        secretNumber = Math.floor(Math.random() * 20 + 1);
    };
    if (scoreReset) {
        score = 20;
        scoreElement.textContent = 20;
        roundCount = 0;
        roundElement.textContent = roundCount;
    }
    else if (lost) scoreElement.textContent = 0;
    bodyElement.style.backgroundColor = "black";
    numberElement.style.width = "15rem";
    if (!lost) numberElement.textContent = '?';
    winFlag = false;
}

reset(true, true, true);

againButton.addEventListener('click', function () {
    reset(true, true, false);
});


checkButton.addEventListener('click', function () {
    if (winFlag) {
        alert("You already won! Click \"Again!\"");
    } else {

        const userInput = document.querySelector('.guess').value;
        if (!userInput) {
            messageElement.textContent = "❎ Empty Input!";
        } else {

            let lost = false;
            let penalty = false;
            let invalidInput = false;

            const guessNumber = Number(userInput);

            if (guessNumber <= 0 || guessNumber > 20) {
                messageElement.textContent = "❎ Invalid input!";
                invalidInput = true;
            } else if (guessNumber === secretNumber) {
                messageElement.textContent = "✅ Correct!";
                bodyElement.style.backgroundColor = "#60b347";
                numberElement.style.width = "30rem";
                numberElement.textContent = secretNumber;
                winFlag = true;
            } else if (guessNumber > secretNumber) {
                penalty = true;
                messageElement.textContent = "⤴️ Your input is larger!";
            } else {
                penalty = true;
                messageElement.textContent = "⤵️Your input is smaller!";
            }

            if (penalty) {
                if (score > 1) {
                    score--;
                    scoreElement.textContent = score;
                    reset(false, false, false);
                } else {
                    score = 0;
                    bodyElement.style.backgroundColor = "red";
                    scoreElement.textContent = score;
                    numberElement.textContent = secretNumber;
                    messageElement.textContent = "❎You lost the game!";
                    reset(false, false, true);
                    lost = true;
                }

            }

            if (!lost & !winFlag & !invalidInput) {
                roundCount++;
                roundElement.textContent = roundCount;
            }


            if (score > highScore && winFlag) {
                highScore = score;
                highScoreElement.textContent = highScore;
            }
        }
    }
});