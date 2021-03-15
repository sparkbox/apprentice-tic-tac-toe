export const gameBoard = new Array(9).fill(null);

const winningPositions = [
  [0, 1, 2], // Horizontal top
  [3, 4, 5], // Horizontal middle
  [6, 7, 8], // Horizontal bottom
  [0, 3, 6], // Verical left
  [1, 4, 7], // Vertical middle
  [2, 5, 8], // Vertical right
  [0, 4, 8], // Diagonal (L to R)
  [2, 4, 6], // Diagonal (R to L)
];

class Game {
  constructor() {
    this.currentPlayer = 'X';
    this.winner = null;
    this.occupiedIndexes = null;
    this.winningPosition = null;
  }

  markBoard(cellIndex) {
    gameBoard[cellIndex] = this.currentPlayer;
  }

  findWinner() {
    // Find all the positions that are occupied by the current player
    const getOccupiedIndexes = (player) => {
      const occupiedIndexes = [];
      gameBoard.forEach((value, index) => {
        if (value === player) {
          occupiedIndexes.push(index);
        }
      });
      return occupiedIndexes;
    };
    this.occupiedIndexes = getOccupiedIndexes(this.currentPlayer);

    const isInOccupiedIndexes = (number) => this.occupiedIndexes.includes(number);

    const getWinningIndex = () => {
      winningPositions.forEach((combination, index) => {
        if (combination.every(isInOccupiedIndexes)) {
          this.winningPosition = index;
        }
      });
    };
    getWinningIndex();

    const updateWinner = () => {
      if (this.winningPosition !== null) {
        this.winner = this.currentPlayer;
      }
    };

    updateWinner();
  }

  nextPlayer() {
    const result = this.currentPlayer === 'X' ? 'O' : 'X';
    this.currentPlayer = result;
  }
}

export const game = new Game();

export function handleClickCell(cell, index) { // 68
  if (cell.className !== undefined) {
    // eslint-disable-next-line no-param-reassign
    cell.innerText = game.currentPlayer;
    game.markBoard(index);
  } else {
    game.markBoard(cell);
  }
  game.findWinner();
  game.nextPlayer();
}
