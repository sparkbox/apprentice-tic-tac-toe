import jsdom from 'jsdom';
import { handleClickCell, state } from './index';

const { JSDOM } = jsdom;

describe('Handle click cell function', () => {
  const gridGame = new JSDOM(`<div class="game-grid">
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
  // As there are multiple grid cell elements, this will only select the first one.
  const gridCell = gridGame.window.document.querySelector('.grid-cell');
  const allGameCells = gridGame.window.document.querySelectorAll('.grid-cell');
  beforeEach(() => {
    allGameCells.forEach((cell) => cell.addEventListener('click', () => { handleClickCell(cell); }));
  });
  afterEach(() => {
    allGameCells.forEach((cell) => {
      // eslint-disable-next-line no-param-reassign
      cell.innerText = '';
    });
    state.currentTurn = 'X';
  });
  it('Shows an empty grid cell before any choices have been made', () => {
    expect(gridCell.textContent).toBe('');
  });
  it('Marks a grid cell with an "X" using the handleClickCell function directly', () => {
    handleClickCell(gridCell);
    expect(gridCell.innerText).toBe('X');
  });
  it('Marks a grid cell with an "X" by clicking', () => {
    gridCell.click();
    expect(gridCell.innerText).toBe('X');
  });
});

describe('Toggling between Xs and Os', () => {
  const gridGame = new JSDOM(`<div class="game-grid">
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
  // As there are multiple grid cell elements, this will only select the first one.
  const allGameCells = gridGame.window.document.querySelectorAll('.grid-cell');
  allGameCells.forEach((cell) => cell.addEventListener('click', () => { handleClickCell(cell); }));
  // The following for loop will go through and click each cell in the game grid.
  // It will click each cell only once, so a cell will go from blank to either an X or an O,
  // depending on whether the click is even (0, 2, 4, 6, 8) or odd (1, 3, 5, 7).
  for (let i = 0; i < allGameCells.length; i += 1) {
    allGameCells[i].click();
    // As indexes are zero based, zero will be counted as even.
    if (i % 2 === 0) {
      it(`Shows that a click on a previously unclicked cell will produce an x if said click is an even number (click #${i})`, () => {
        expect(allGameCells[i].innerText).toBe('X');
      });
    } else {
      it(`Shows that a click on a previously unclicked cell will produce an o if said click is an odd number (click #${i})`, () => {
        expect(allGameCells[i].innerText).toBe('O');
      });
    }
  }
});
