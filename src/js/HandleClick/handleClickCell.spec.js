/* eslint-disable quotes */
import jsdom from 'jsdom';
import Game from '../Game/game';
import handleClickCell from './handleClickCell';

const { JSDOM } = jsdom;

// helper function to create the mock tic-tac-toe UI used in the tests
function createTicTacToeUI() {
  return new JSDOM(`
  <h2 class="subheader"></h2>
  <div class="game-grid">
    <div class="grid-cell"></div>
    <div class="grid-cell"></div>
    <div class="grid-cell"></div>
    <div class="grid-cell"></div>
    <div class="grid-cell"></div>
    <div class="grid-cell"></div>
    <div class="grid-cell"></div>
    <div class="grid-cell"></div>
    <div class="grid-cell"></div>
  </div>
`);
}

describe('Handle click cell function', () => {
  let gridGame;
  let game;
  let singleGridCell;
  let subheader; // not ever defined or used, but needed to pass into handleClickCell
  beforeEach(() => {
    gridGame = createTicTacToeUI();
    game = new Game();
    // As there are multiple grid cell elements, this will only select the first one.
    singleGridCell = gridGame.window.document.querySelector('.grid-cell');
  });
  it('Shows an empty grid cell before any choices have been made', () => {
    expect(singleGridCell.textContent).toBe('');
  });
  it('Marks a grid cell with an "X" using the handleClickCell function directly', () => {
    handleClickCell(singleGridCell, subheader, 0, game);
    expect(singleGridCell.innerText).toBe('X');
  });
  it('Does not mark a grid that has been marked already', () => {
    handleClickCell(singleGridCell, subheader, 0, game);
    expect(singleGridCell.innerText).toEqual('X');
    handleClickCell(singleGridCell, subheader, 0, game);
    expect(singleGridCell.innerText).toEqual('X');
  });
});

describe('Toggling between Xs and Os', () => {
  const gridGame = createTicTacToeUI();
  const game = new Game();
  const allGridCells = gridGame.window.document.querySelectorAll('.grid-cell');
  let subheader; // not ever defined or used, but needed to pass into handleClickCell
  let index; // As we're not testing game board, this number doesn't matter for this test suite
  it('Shows that the first click will be an X', () => {
    handleClickCell(allGridCells[5], subheader, index, game);
    expect(allGridCells[5].innerText).toBe('X');
  });
  it('Shows that the second/next click will be an O', () => {
    handleClickCell(allGridCells[3], subheader, index, game);
    expect(allGridCells[3].innerText).toBe('O');
  });
  it('Shows that a third click will be an X', () => {
    handleClickCell(allGridCells[2], subheader, index, game);
    expect(allGridCells[2].innerText).toBe('X');
  });
});

describe('Update subheader text', () => {
  let gridGame;
  let game;
  let subheader;
  let index;
  beforeEach(() => {
    gridGame = createTicTacToeUI();
    subheader = gridGame.window.document.querySelector('.subheader');
    subheader.innerText = (`It's X's turn`);
    game = new Game();
  });
  it('Shows X\'s turn in subheader at the beginning of the game', () => {
    expect(subheader.innerText).toBe(`It's X's turn`);
  });
  it('Shows O\'s turn in subheader after first turn', () => {
    const gridCell = gridGame.window.document.querySelector('.grid-cell');
    handleClickCell(gridCell, subheader, index, game);
    expect(subheader.innerText).toBe(`It's O's turn`);
  });
  it('Shows X\'s turn in subheader after two turns', () => {
    const firstGridCell = gridGame.window.document.querySelectorAll('.grid-cell')[0];
    const secondGridCell = gridGame.window.document.querySelectorAll('.grid-cell')[1];
    handleClickCell(firstGridCell, subheader, index, game);
    handleClickCell(secondGridCell, subheader, index, game);
    expect(subheader.innerText).toBe(`It's X's turn`);
  });
});

describe('Expect changes in the UI to be reflected in our game object', () => {
  const gridGame = createTicTacToeUI();
  const game = new Game();
  const allGridCells = gridGame.window.document.querySelectorAll('.grid-cell');
  let subheader;
  // When the UI is expressed as an array (i.e. when called using querySelectorAll),
  // The indexes are the same as the indexes in the game board array from the Game object.
  it('Returns the empty squares for the UI and the empty game object', () => {
    allGridCells.forEach((cell) => expect(cell.innerText).toBe(undefined));
    expect(game.gameBoard).toStrictEqual([null, null, null, null, null, null, null, null, null]);
  });
  it('Marks one square with an X and see that the matching cell in the game object has an X', () => {
    handleClickCell(allGridCells[1], subheader, 1, game);
    expect(allGridCells[1].innerText).toBe('X');
    expect(game.gameBoard).toStrictEqual([null, 'X', null, null, null, null, null, null, null]);
  });
  it('Marks one square with an O and see that the matching cell in the game object has an O', () => {
    handleClickCell(allGridCells[0], subheader, 0, game);
    expect(allGridCells[0].innerText).toBe('O');
    expect(game.gameBoard).toStrictEqual(['O', 'X', null, null, null, null, null, null, null]);
  });
});
