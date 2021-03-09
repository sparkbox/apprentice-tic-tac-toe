import jsdom from 'jsdom';
import handleClickCell from './index';

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
  allGameCells.forEach((cell) => cell.addEventListener('click', () => { handleClickCell(cell); }));
  it('Shows an empty grid cell before any choices have been made', () => {
    expect(gridCell.textContent).toBe('');
  });
  it('Marks a grid cell with an "x" using the handleClickCell function directly', () => {
    handleClickCell(gridCell);
    expect(gridCell.innerText).toBe('X');
  });
  it('Marks a grid cell with an "x" by clicking', () => {
    gridCell.click();
    expect(gridCell.innerText).toBe('X');
  });
  it('Marks all grid cells with an "x"', () => {
    allGameCells.forEach((cell) => cell.click());
    allGameCells.forEach((cell) => expect(cell.innerText).toBe('X'));
  });
});
