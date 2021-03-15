// eslint-disable-next-line import/extensions
import { handleClickCell } from './Game/game.js';

console.debug('Welcome to Tic Tac Toe!');

const allGameCells = document.querySelectorAll('.grid-cell');
allGameCells.forEach((cell, index) => cell.addEventListener('click', () => {
  handleClickCell(cell, index);
}));
