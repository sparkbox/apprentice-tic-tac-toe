import { handleClickCell, game } from './game';

describe('game array', () => {
  it('shows an array with 9 elements all marked null before handleClickCell is run', () => {
    expect(game.board).toHaveLength(9);
    // documentation led me to believe this is the right way to compare two arrays but I'm not sure?
    expect(game.board).toEqual(new Array(9).fill(null));
  });
  // add a test for handleClickCell? Or are we testing markSpace?
});
