export default class Game {
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
