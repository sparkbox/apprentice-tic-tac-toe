export class Game {
  constructor() {
    this.currentPlayer = 'X';
    this.winner = null;
    this.gameBoard = new Array(9).fill(null);
  }

  markBoard(index) {
    this.gameBoard[index] = this.currentPlayer;
  }

  nextPlayer() {
    const result = this.currentPlayer === 'X' ? 'O' : 'X';
    this.currentPlayer = result;
  }
}

const game = new Game();

export function handleClickCell(cell, subheading, index, currGame = game) {
  if (cell.innerText) return;
  // eslint-disable-next-line no-param-reassign
  cell.innerText = currGame.currentPlayer;
  currGame.markBoard(index);
  currGame.nextPlayer();
  if (subheading) {
    // eslint-disable-next-line no-param-reassign
    subheading.innerText = `It's ${currGame.currentPlayer}'s turn`;
  }
}
