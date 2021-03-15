import { Game } from './game';

describe('game array', () => {
  const newGame = new Game();

  it('shows an array with 9 elements all marked null before handleClickCell is run', () => {
    expect(newGame.board).toHaveLength(9);
    // documentation led me to believe this is the right way to compare two arrays but I'm not sure?
    expect(newGame.board).toEqual(new Array(9).fill(null));
  });
  it('updates the array with an X in the chosen index', () => {
    const chosenIndex = 2;
    const expectedGameArray = [null, null, 'X', null, null, null, null, null, null];
    newGame.markSpace(chosenIndex); // does it make more sense to use this or should I just use 2
    expect(newGame.board).toEqual(expectedGameArray);
  });
  // this feels weird forcing it to progress like this without handleClickCell but maybe it's right?
  // basically the tests are building on each other, so without the next one, the last one will fail
  it('changes the player to O', () => {
    expect(newGame.currentPlayer).toBe('X');
    newGame.nextPlayer();
    expect(newGame.currentPlayer).toBe('O');
  });
  it('updates the array with an O in the chosen index after doing so with X', () => {
    const chosenIndex = 3;
    const expectedGameArray = [null, null, 'X', 'O', null, null, null, null, null];
    newGame.markSpace(chosenIndex);
    console.log(newGame.board);
    expect(newGame.board).toEqual(expectedGameArray);
  });
});
