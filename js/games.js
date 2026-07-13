/*
 * File: games.js
 *
 * Description:
 * Implements the Tic Tac Toe desktop application.
 *
 * Handles player interaction, computer opponent logic,
 * game state management, win and draw detection,
 * and game reset functionality.
 */

const gameCells = document.querySelectorAll("[data-cell]");
const gameStatus = document.getElementById("gameStatus");
const resetGameButton = document.getElementById("resetGameBtn");

let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  const values = [...gameCells].map((cell) => {
    return cell.textContent;
  });

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      values[a] &&
      values[a] === values[b] &&
      values[a] === values[c]
    ) {
      return values[a];
    }
  }

  if (values.every(Boolean)) {
    return "draw";
  }

  return null;
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;

  gameCells.forEach(cell => {
    cell.textContent = "";
    cell.disabled = false;
  });

  gameStatus.textContent = "Your turn";
}

gameCells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.textContent || currentPlayer !== "X") {
      return;
    }

    cell.textContent = "X";

    const result = checkWinner();

    if (result === "draw") {
      gameStatus.textContent = "Draw game";
      gameActive = false;
      return;
    }

    if (result) {
      gameStatus.textContent = `${result} wins`;
      gameActive = false;

      gameCells.forEach(cell => {
        cell.disabled = true;
      });

      return;
    }

    currentPlayer = "O";
    gameStatus.textContent = "Computer is thinking...";

    setTimeout(makeComputerMove, 400);
  });
});

if (resetGameButton) {
  resetGameButton.addEventListener("click", resetGame);
}

function makeComputerMove() {
  const emptyCells = [...gameCells].filter(cell => !cell.textContent);

  if (!gameActive || emptyCells.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const selectedCell = emptyCells[randomIndex];

  selectedCell.textContent = "O";

  const result = checkWinner();

  if (result === "draw") {
    gameStatus.textContent = "Draw game";
    gameActive = false;
    return;
  }

  if (result) {
    gameStatus.textContent = `${result} wins`;
    gameActive = false;

    gameCells.forEach(cell => {
      cell.disabled = true;
    });

    return;
  }

  currentPlayer = "X";
  gameStatus.textContent = "Your turn";
}