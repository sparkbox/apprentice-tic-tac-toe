const gameState = {
  currentPlayer: 'X',
};

class Game {
  constructor(state) {
    this.state = state;
  }

  nextPlayer() {
    this.state = { currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X' };
  }
}

export const game = new Game(gameState);

export function handleClickCell(cell) { // 68
  // eslint-disable-next-line no-param-reassign
  cell.innerText = game.state.currentPlayer;
  game.nextPlayer();
}
