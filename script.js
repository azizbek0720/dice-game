"use strict";

const playerNames = document.querySelectorAll(".player .name");
const players = document.querySelectorAll(".player");
const player1 = document.querySelector(".player-1");
const player2 = document.querySelector(".player-2");
const totalS1 = document.querySelector(".player-1 .total-score");
const totalS2 = document.querySelector(".player-2 .total-score");
const currentS1 = document.querySelector(".player-1 .current-score");
const currentS2 = document.querySelector(".player-2 .current-score");
const diceImg = document.querySelector("img");

const newGameBtn = document.querySelector(".new-game");
const diceBtn = document.querySelector(".roll-dice");
const holdBtn = document.querySelector(".hold");

let isWinner1 = "";
let isWinner2 = "";

function changePlayer(...csElm) {
  if (!isWinner1 && !isWinner2) {
    player1.classList.toggle("active");
    player2.classList.toggle("active");
    csElm.forEach((cs) => (cs.textContent = 0));
  }
}

function diceRender() {
  diceBtn.addEventListener("click", function () {
    if (!isWinner1 && !isWinner2) {
      const diceIdx = +(Math.random() * 5).toFixed() + 1;
      diceImg.classList.remove("hidden");
      diceImg.src = `./images/dice-${diceIdx}.png`;

      if (player1.classList.contains("active")) {
        currentS1.textContent = +currentS1.textContent + diceIdx;
        if (diceIdx === 1) changePlayer(currentS1, currentS2);
      } else if (player2.classList.contains("active")) {
        currentS2.textContent = +currentS2.textContent + diceIdx;
        if (diceIdx === 1) changePlayer(currentS2, currentS1);
      }
    }
  });
}

function holdRender() {
  holdBtn.addEventListener("click", function () {
    if (+currentS1.textContent) {
      totalS1.textContent = +totalS1.textContent + +currentS1.textContent;
    } else if (+currentS2.textContent) {
      totalS2.textContent = +totalS2.textContent + +currentS2.textContent;
    }
    changePlayer(currentS1, currentS2);
    checkWinner(totalS1, totalS2);
    if (isWinner1 || isWinner2) diceImg.classList.add("hidden");
  });
}

function checkWinner(...tsElm) {
  if (tsElm[0].textContent >= 10) {
    isWinner1 = true;
    player1.classList.add("winner");
    player2.classList.remove("active");
    playerNames[0].textContent = "PLAYER 1 Won🏆😏";
  } else if (tsElm[1].textContent >= 10) {
    isWinner2 = true;
    player2.classList.add("winner");
    player1.classList.remove("active");
    playerNames[1].textContent = "PLAYER 2 Won🏆😏";
  }
}

function newGameRender() {
  newGameBtn.addEventListener("click", function () {
    isWinner1 = false;
    isWinner2 = false;
    diceImg.classList.add("hidden");
    totalS1.textContent = 0;
    totalS2.textContent = 0;
    currentS1.textContent = 0;
    currentS2.textContent = 0;
    players.forEach((player) => {
      player.classList.remove("winner");
      player.classList.remove("active");
    });
    player1.classList.add("active");
    playerNames.forEach((playerName, idx) => {
      playerName.textContent = `PLAYER ${idx + 1}`;
    });
  });
}

function init() {
  diceRender();
  holdRender();
  newGameRender();
}

init();
