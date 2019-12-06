/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/************************* Pig Game ****************************/

let scores, roundScore, activePlayer, gamePlaying, winningScore;

init();

/************************* Event Listener for the roll dice btn **********************/

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. Random Numnber
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display the Result
    document.getElementById("dice1").style.display = "block";
    document.getElementById("dice2").style.display = "block";
    document.getElementById("dice1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice2").src = "dice-" + dice2 + ".png";

    //3. Update the round score If the rolled number was NOT 1
    if (dice1 !== 1 && dice2) {
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //next Player
      nextPlayer();
    }
  }
});

/************************* Event Listener for the hold btn **********************/

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //Add current score to global score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    let input = document.querySelector(".winningScore").value;
    let winningScore;

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    //Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!!!";
      document.getElementById("dice1").style.display = "none";
      document.getElementById("dice2").style.display = "none";

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //This will activate the player that is currently playing
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.getElementById("dice1").style.display = "none";
  document.getElementById("dice2").style.display = "none";
}

/**************** Event Listener for the New Game btn ************/

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  gamePlaying = true;

  //This will hide the dice from the game
  document.getElementById("dice1").style.display = "none";
  document.getElementById("dice2").style.display = "none";

  //Setting the values of the scores to 0
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
