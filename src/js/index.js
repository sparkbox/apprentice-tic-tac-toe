console.debug('Welcome to Tic Tac Toe!');

// eslint-disable-next-line import/no-mutable-exports
export let state = {
  currentTurn: 'X',
};

export function handleClickCell(cell) { // 68
  if (cell.innerText) return;
  // eslint-disable-next-line no-param-reassign
  cell.innerText = state.currentTurn;
  state = { currentTurn: state.currentTurn === 'X' ? 'O' : 'X' };
}
// eslint-disable-next-line no-undef
const allGameCells = document.querySelectorAll('.grid-cell');
allGameCells.forEach((cell) => cell.addEventListener('click', () => { handleClickCell(cell); }));
