/* eslint-disable quotes */
import { enableFetchMocks } from 'jest-fetch-mock';
import jsdom from 'jsdom';
import { handleClickCell, Game } from './Game/game';
import { getVersionNumber, updateVersionNumber } from './version';

enableFetchMocks();

const { JSDOM } = jsdom;

// helper function to create the mock tic-tac-toe UI used in the tests
function createTicTacToeUI() {
  return new JSDOM(`
  <h2 class="subheader"></h2>
  <div class="game-grid">
    <div class="grid-cell util-no-top-border util-no-left-border"></div>
    <div class="grid-cell util-no-top-border"></div>
    <div class="grid-cell util-no-top-border util-no-right-border"></div>
    <div class="grid-cell util-no-left-border"></div>
    <div class="grid-cell"></div>
    <div class="grid-cell util-no-right-border"></div>
    <div class="grid-cell util-no-bottom-border util-no-left-border"></div>
    <div class="grid-cell util-no-bottom-border"></div>
    <div class="grid-cell util-no-bottom-border util-no-right-border"></div>
  </div>
`);
}

// helper function to add event listeners to cells
function addHandleClickListener(cells, subheader, game) {
  cells.forEach((cell) => cell.addEventListener('click', () => { handleClickCell(cell, subheader, game); }));
}

describe('Handle click cell function', () => {
  let gridGame;
  let game;
  let singleGridCell;
  let allGridCells;
  let subheader; // not ever defined or used, but needed to pass into handleClickCell
  beforeEach(() => {
    gridGame = createTicTacToeUI();
    game = new Game();
    // As there are multiple grid cell elements, this will only select the first one.
    singleGridCell = gridGame.window.document.querySelector('.grid-cell');
    allGridCells = gridGame.window.document.querySelectorAll('.grid-cell');
    addHandleClickListener(allGridCells, subheader, game);
  });
  it('Shows an empty grid cell before any choices have been made', () => {
    expect(singleGridCell.textContent).toBe('');
  });
  it('Marks a grid cell with an "X" using the handleClickCell function directly', () => {
    handleClickCell(singleGridCell, subheader, game);
    expect(singleGridCell.innerText).toBe('X');
  });
  it('Marks a grid cell with an "X" by clicking', () => {
    singleGridCell.click();
    expect(singleGridCell.innerText).toBe('X');
  });
  it('Does not mark a grid that has been marked already', () => {
    singleGridCell.click();
    const click1GridContent = singleGridCell.innerText;
    singleGridCell.click();
    const click2GridContent = singleGridCell.innerText;
    expect(click1GridContent).toEqual('X');
    expect(click2GridContent).toEqual('X');
  });
});

describe('Toggling between Xs and Os', () => {
  const gridGame = createTicTacToeUI();
  const game = new Game();
  const allGridCells = gridGame.window.document.querySelectorAll('.grid-cell');
  let subheader; // not ever defined or used, but needed to pass into handleClickCell
  addHandleClickListener(allGridCells, subheader, game);
  // The following for loop will go through and click each cell in the game grid.
  // It will click each cell only once, so a cell will go from blank to either an X or an O,
  // depending on whether the click is even (0, 2, 4, 6, 8) or odd (1, 3, 5, 7).
  for (let i = 0; i < allGridCells.length; i += 1) {
    allGridCells[i].click(); // Simulate clicking each cell in order from index 0 to 8
    // As indexes are zero based, zero will be counted as even.
    if (i % 2 === 0) {
      it(`Shows that a click on a previously unclicked cell will produce an x if said click is an even number (click #${i})`, () => {
        expect(allGridCells[i].innerText).toBe('X');
      });
    } else {
      it(`Shows that a click on a previously unclicked cell will produce an o if said click is an odd number (click #${i})`, () => {
        expect(allGridCells[i].innerText).toBe('O');
      });
    }
  }
});

describe('subheader text', () => {
  let gridGame;
  let game;
  let allGridCells;
  let subheader;
  beforeEach(() => {
    gridGame = createTicTacToeUI();
    subheader = gridGame.window.document.querySelector('.subheader');
    subheader.innerText = (`It's X's turn`);
    game = new Game();
    allGridCells = gridGame.window.document.querySelectorAll('.grid-cell');
    addHandleClickListener(allGridCells, subheader, game);
  });
  it(`shows X's turn in subheader at the beginning of the game`, () => {
    expect(subheader.innerText).toBe(`It's X's turn`);
  });
  it(`shows O's turn in subheader after first turn`, () => {
    const gridCell = gridGame.window.document.querySelector('.grid-cell');
    gridCell.click();
    expect(subheader.innerText).toBe(`It's O's turn`);
  });
  it(`show's X's turn in subheader after two turns`, () => {
    const firstGridCell = gridGame.window.document.querySelectorAll('.grid-cell')[0];
    const secondGridCell = gridGame.window.document.querySelectorAll('.grid-cell')[1];
    firstGridCell.click();
    secondGridCell.click();
    expect(subheader.innerText).toBe(`It's X's turn`);
  });
});

describe('Show the current version number', () => {
  it('Returns a current version of 1.0.0', async () => {
    fetch.mockResponseOnce(JSON.stringify('1.0.0'));
    const versionNumber = await getVersionNumber();
    expect(versionNumber).toBe('1.0.0');
  });
  it('Shows the source URL for the current version', async () => {
    expect(fetch.mock.calls[0][0]).toEqual('./version');
  });
  it('Shows the version number is 1.0.0 on the Tic Tac Toe page', async () => {
    const versionNumberDom = new JSDOM('<h2 class="app-version">Version <span class="app-version_version">0.0.1</span></h2>');
    const appVersion = versionNumberDom.window.document.querySelector('.app-version_version');
    fetch.mockResponseOnce(JSON.stringify('1.0.0'));
    await updateVersionNumber(appVersion);
    expect(appVersion.innerText).toBe('1.0.0');
  });
});


