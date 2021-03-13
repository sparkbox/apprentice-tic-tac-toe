import jsdom from 'jsdom';
import { handleClickCell, game, gameBoard } from './Game/game';

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
    game.currentPlayer = 'X';
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
  game.currentPlayer = 'X';
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

describe('Mark cells without using the DOM', () => {
  afterEach(() => {
    game.currentPlayer = 'X';
    gameBoard.forEach(() => null);
  });
  it('Marks one cell with an X', () => {
    handleClickCell(0);
    expect(gameBoard[0]).toBe('X');
  });
  it('Toggles between Xs and Os for an entire board', () => {
    gameBoard.forEach((value, index) => { handleClickCell(index); });
    gameBoard.forEach((value, index) => (index % 2 === 0 ? expect(value).toBe('X') : expect(value).toBe('O')));
  });
});

describe('Confirm marked cells are tracked in the occupied indexes property', () => {
  beforeAll(() => {
    game.currentPlayer = 'X';
    gameBoard.fill(null);
    game.occupiedIndexes = null;
  });
  it('Shows that the index of a cell marked with an X will have its index recorded', () => {
    handleClickCell(0);
    expect(game.occupiedIndexes).toEqual([0]);
  });
  it('Shows that the index of a cell marked with an O will have its index recorded', () => {
    game.currentPlayer = 'O';
    handleClickCell(2);
    expect(game.occupiedIndexes).toEqual([2]);
  });
  it('Shows all indexes of cells marked with an X will have their indexes recorded', () => {
    handleClickCell(1);
    expect(game.occupiedIndexes).toEqual([0, 1]);
  });
  it('Shows all indexes of cells marked with an O will have their indexes recorded', () => {
    game.currentPlayer = 'O';
    handleClickCell(5);
    expect(game.occupiedIndexes).toEqual([2, 5]);
  });
});

describe('Confirm that winning positions can be detected', () => {
  beforeAll(() => {
    game.currentPlayer = 'X';
    gameBoard.fill(null);
    game.occupiedIndexes = null;
    game.winningPosition = null;
  });
  it('Shows that a non-winning position will return a value of null', () => {
    handleClickCell(3);
    handleClickCell(2);
    handleClickCell(0);
    handleClickCell(5);
    handleClickCell(7);
    handleClickCell(6);
    expect(game.winningPosition).toBe(null);
  });
  it('Shows that a winning position will return its index in the winning positions array', () => {
    handleClickCell(1);
    handleClickCell(8);
    expect(game.winningPosition).toBe(5);
  });
});

describe('Correctly find game winners', () => {
  afterEach(() => {
    game.currentPlayer = 'X';
    gameBoard.fill(null);
    game.occupiedIndexes = null;
    game.winningPosition = null;
    game.winner = null;
  });
  it('Shows the winning combination and the winner', () => {
    expect(game.winningPosition).toBe(5);
    expect(game.winner).toBe('O');
  });
});
