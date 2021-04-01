/* eslint-disable import/extensions */
import Game from './Game/game.js';
import { updateVersionNumber } from './version.js';
// eslint-disable-next-line no-undef
const subheader = document.querySelector('.subheader');
// eslint-disable-next-line quotes
subheader.innerText = (`It's X's turn`);
// eslint-disable-next-line no-undef
const allGameCells = document.querySelectorAll('.grid-cell');
allGameCells.forEach((cell, index) => cell.addEventListener('click', () => { handleClickCell(cell, subheader, index); }));

const appVersion = document.querySelector('.app-version_version');
const game = new Game();

console.debug('Welcome to Tic Tac Toe!');
updateVersionNumber(appVersion);

function handleClickCell(cell, subheading, index, currGame = game) {
  if (cell.innerText) return;
  // eslint-disable-next-line no-param-reassign
  cell.innerText = currGame.currentPlayer;
  currGame.markBoard(index);
  currGame.nextPlayer();
  if (subheading) {
    // eslint-disable-next-line no-param-reassign
    subheading.innerText = `It's ${currGame.currentPlayer}'s turn`;
  }
}

allGameCells.forEach((cell, index) => cell.addEventListener('click', () => { handleClickCell(cell, subheader, index); }));
