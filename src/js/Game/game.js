export class Game {
  constructor() {
    this.currentPlayer = 'X';
    this.winner = null;
  }

  nextPlayer() {
    const result = this.currentPlayer === 'X' ? 'O' : 'X';
    this.currentPlayer = result;
  }
}

const game = new Game();

export function handleClickCell(cell, currGame = game) {
  if (cell.innerText) return;
  // eslint-disable-next-line no-param-reassign
  cell.innerText = currGame.currentPlayer;
  currGame.nextPlayer();
}
