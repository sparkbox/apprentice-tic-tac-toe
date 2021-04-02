export default class Game {
  constructor() {
    this._currentPlayer = 'X';
    this._winner = null;
    this._gameBoard = new Array(9).fill(null);
  }

  get currentPlayer() {
    return this._currentPlayer;
  }

  set currentPlayer(newPlayer) {
    this._currentPlayer = newPlayer;
  }

  get gameBoard() {
    return this._gameBoard;
  }

  markBoard(index) {
    this.gameBoard[index] = this.currentPlayer;
  }

  nextPlayer() {
    const result = this.currentPlayer === 'X' ? 'O' : 'X';
    this.currentPlayer = result;
  }
}
