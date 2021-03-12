export const gameBoard = new Array(9).fill(null);

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

class Game {
  constructor() {
    this.currentPlayer = 'X';
    this.winner = null;
  }

  markBoard(cellIndex) {
    gameBoard[cellIndex] = this.currentPlayer;
  }

  nextPlayer() {
    const result = this.currentPlayer === 'X' ? 'O' : 'X';
    this.currentPlayer = result;
  }
}

export const game = new Game();

export function handleClickCell(cell) { // 68
  if (cell.className !== undefined) {
    // eslint-disable-next-line no-param-reassign
    cell.innerText = game.currentPlayer;
  } else {
    game.markBoard(cell);
  }
  game.nextPlayer();
}
