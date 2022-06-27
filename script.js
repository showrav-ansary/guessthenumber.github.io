'use strict';

let secretNumber;
let score;
let highScore = 0;
let roundCount = 0;
let winFlag = false;

function reset(scoreReset, setNewSecretNumber, lost) {
    if (!secretNumber || setNewSecretNumber){ 
        document.querySelector('.message').textContent = "Start guessing...";
        secretNumber = Math.floor(Math.random() * 20 + 1);
    };
    if (scoreReset) {
        score = 20;
        document.querySelector('.score').textContent = 20;
        roundCount = 0;
        document.querySelector('.round').textContent = roundCount;
    }
    else if (lost) document.querySelector('.score').textContent = 0;
    document.querySelector('body').style.backgroundColor = "black";
    document.querySelector('.number').style.width = "15rem";
    if (!lost) document.querySelector('.number').textContent = '?';
    winFlag = false;
}

reset(true, true, true);

document.querySelector('.again').addEventListener('click', function () {
    reset(true, true, false);
});


document.querySelector('.check').addEventListener('click', function () {
    if (winFlag) {
        alert("You already won! Click \"Again!\"");
    } else {

        const userInput = document.querySelector('.guess').value;
        if (!userInput) {
            document.querySelector('.message').textContent = "❎ Empty Input!";
        } else {

            let lost = false;
            let penalty = false;
            let invalidInput = false;

            const guessNumber = Number(userInput);

            if (guessNumber <= 0 || guessNumber > 20) {
                document.querySelector('.message').textContent = "❎ Invalid input!";
                invalidInput = true;
            } else if (guessNumber === secretNumber) {
                document.querySelector('.message').textContent = "✅ Correct!";
                document.querySelector('body').style.backgroundColor = "#60b347";
                document.querySelector('.number').style.width = "30rem";
                document.querySelector('.number').textContent = secretNumber;
                winFlag = true;
            } else if (guessNumber > secretNumber) {
                penalty = true;
                document.querySelector('.message').textContent = "⤴️ Your input is larger!";
            } else {
                penalty = true;
                document.querySelector('.message').textContent = "⤵️Your input is smaller!";
            }

            if (penalty) {
                if (score > 1) {
                    score--;
                    document.querySelector('.score').textContent = score;
                    reset(false, false, false);
                } else {

                    score = 0;
                    document.querySelector('body').style.backgroundColor = "red";
                    document.querySelector('.score').textContent = score;
                    document.querySelector('.number').textContent = secretNumber;
                    document.querySelector('.message').textContent = "❎You lost the game!";
                    reset(false, false, true);
                    lost = true;
                }

            }

            if (!lost & !winFlag & !invalidInput) {
                roundCount++;
                document.querySelector('.round').textContent = roundCount;
            }


            if (score > highScore && winFlag) {
                highScore = score;
                document.querySelector('.highscore').textContent = highScore;
            }
        }
    }
});