const gameBoard = new Array(9).fill(null);

class Game {
  constructor() {
    this.currentPlayer = 'X';
    this.winner = null;
  }

  nextPlayer() {
    const result = this.currentPlayer === 'X' ? 'O' : 'X';
    this.currentPlayer = result;
  }
}

export const game = new Game();

export function handleClickCell(cell) { // 68
  // eslint-disable-next-line no-param-reassign
  cell.innerText = game.currentPlayer;
  game.nextPlayer();
}
