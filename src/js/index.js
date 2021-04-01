/* eslint-disable import/extensions */
import Game from './Game/game.js';
import handleClickCell from './HandleClick/handleClickCell.js'
import { updateVersionNumber } from './version.js';
// eslint-disable-next-line no-undef
const subheader = document.querySelector('.subheader');
subheader.innerText = ('It\'s X\'s turn');
// eslint-disable-next-line no-undef
const allGameCells = document.querySelectorAll('.grid-cell');
const appVersion = document.querySelector('.app-version_version');
const game = new Game();

console.debug('Welcome to Tic Tac Toe!');
updateVersionNumber(appVersion);

allGameCells.forEach((cell, index) => cell.addEventListener('click', () => { handleClickCell(cell, subheader, index, game); }));
