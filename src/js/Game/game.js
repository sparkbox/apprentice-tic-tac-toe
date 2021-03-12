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

const game = new Game(gameState);

export default function handleClickCell(cell) { // 68
  // eslint-disable-next-line no-param-reassign
  cell.innerText = game.state.currentPlayer;
  game.nextPlayer();
}
