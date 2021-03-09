import jsdom from 'jsdom';
import fs from 'fs';
import handleClickCell from './index';

const { JSDOM } = jsdom;

const indexHtmlFile = fs.readFileSync('./src/html/index.html').toString();

const dom = new JSDOM(indexHtmlFile);

describe('index.js tests will go here', () => {
  it('expects first test to equal 1', () => {
    const firstTest = 1;
    expect(firstTest).toBe(1);
  });
});

describe('replacing text in the paragraph tag', () => {
  const testDom = new JSDOM('<doctype html><p>Hello, world</p>');
  const testDomParagraph = testDom.window.document.querySelector('p');
  it('expects the paragraph to have a value of "Hello, world"', () => {
    expect(testDomParagraph.textContent).toBe('Hello, world');
  });
});

describe('Handle click cell function', () => {
  // As there are multiple grid cell elements, this will only select the first one.
  const gridCell = dom.window.document.querySelector('.grid-cell');
  const allGameCells = dom.window.document.querySelectorAll('.grid-cell');
  it('Shows an empty grid cell before any choices have been made', () => {
    expect(gridCell.textContent).toBe('');
  });
  it('Marks a grid cell with an "x"', () => {
    handleClickCell(gridCell);
    expect(gridCell.innerText).toBe('X');
  });
  it('Marks all grid cells with an "x"', () => {
    allGameCells.forEach((cell) => cell.addEventListener('click', () => { handleClickCell(cell); }));
    allGameCells.forEach((cell) => cell.click());
    allGameCells.forEach((cell) => expect(cell.innerText).toBe('X'));
  });
});
