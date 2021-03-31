export class Game {
  constructor() {
    this.currentPlayer = 'X';
    this.winner = null;
    this.gameBoard = new Array(9).fill(null);
  }

  nextPlayer() {
    const result = this.currentPlayer === 'X' ? 'O' : 'X';
    this.currentPlayer = result;
  }
}

const game = new Game();

export function handleClickCell(cell, subheading, currGame = game) {
  if (cell.innerText) return;
  // eslint-disable-next-line no-param-reassign
  cell.innerText = currGame.currentPlayer;
  currGame.nextPlayer();
  if (subheading) {
    // eslint-disable-next-line no-param-reassign
    subheading.innerText = `It's ${currGame.currentPlayer}'s turn`;
  }
}
