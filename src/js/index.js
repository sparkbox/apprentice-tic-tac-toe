console.debug('Welcome to Tic Tac Toe!');

function handleClickCell(cell) {
  // eslint-disable-next-line no-param-reassign
  cell.innerText = 'X';
}
// eslint-disable-next-line no-undef
const allGameCells = document.querySelectorAll('.grid-cell');
allGameCells.forEach((cell) => cell.addEventListener('click', () => { handleClickCell(cell); }));

export default handleClickCell;
