class Game {
  constructor() {
    this.currentPlayer = 'X';
    this.winner = null;
    this.board = new Array(9).fill(null); // But should this be here?
  }

  markSpace(index) {
    const newBoard = this.board;
    newBoard[index] = this.currentPlayer;
    console.log(newBoard);
    this.board = newBoard;
  }

  nextPlayer() {
    const result = this.currentPlayer === 'X' ? 'O' : 'X';
    this.currentPlayer = result;
  }
}

export const game = new Game();

export function handleClickCell(cell, index) { // 68
  console.log(index);
  console.log(cell);
  // eslint-disable-next-line no-param-reassign
  cell.innerText = game.currentPlayer; // this part manipulates the dom
  game.markSpace(index); // this part manipulates the model
  game.nextPlayer();
}
