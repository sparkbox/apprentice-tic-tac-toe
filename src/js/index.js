console.debug('Welcome to Tic Tac Toe!');
function handleClickCell(cell) { // 68
  // eslint-disable-next-line no-param-reassign
  cell.innerText = 'X'; // 68
}
// eslint-disable-next-line no-undef
const allGameCells = document.querySelectorAll('.grid-cell');
allGameCells.forEach((cell) => cell.addEventListener('click', () => { handleClickCell(cell); }));
