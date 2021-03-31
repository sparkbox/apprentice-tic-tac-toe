/* eslint-disable import/extensions */
import { handleClickCell } from './Game/game.js';
import { updateVersionNumber } from './version.js';

console.debug('Welcome to Tic Tac Toe!');

// eslint-disable-next-line no-undef
const subheader = document.querySelector('.subheader');
// eslint-disable-next-line quotes
subheader.innerText = (`It's X's turn`);
// eslint-disable-next-line no-undef
const allGameCells = document.querySelectorAll('.grid-cell');
allGameCells.forEach((cell, index) => cell.addEventListener('click', () => { handleClickCell(cell, subheader, index); }));

const appVersion = document.querySelector('.app-version_version');

updateVersionNumber(appVersion);
