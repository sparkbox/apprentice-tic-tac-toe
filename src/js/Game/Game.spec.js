import Game from './game';

describe('Use the game board to mark spaces', () => {
  const gameWithBoard = new Game();
  it('Shows a game board before anything has been selected', () => {
    expect(gameWithBoard.gameBoard).toStrictEqual(
      [null, null, null, null, null, null, null, null, null],
    );
  });

  it('Marks the space with current player', () => {
    gameWithBoard.markBoard(1);
    expect(gameWithBoard.gameBoard).toStrictEqual([null, 'X', null, null, null, null, null, null, null]);
  });
  it('Marks the next space with an O', () => {
    gameWithBoard.nextPlayer();
    gameWithBoard.markBoard(0);
    expect(gameWithBoard.gameBoard).toStrictEqual(['O', 'X', null, null, null, null, null, null, null]);
  });
});
