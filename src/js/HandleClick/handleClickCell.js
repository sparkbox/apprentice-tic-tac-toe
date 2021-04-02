/* eslint-disable no-param-reassign */
function handleClickCell(cell, subheading, index, currGame) {
  if (cell.innerText) return;
  cell.innerText = currGame.currentPlayer;
  currGame.markBoard(index);
  currGame.nextPlayer();
  if (subheading) {
    subheading.innerText = `It's ${currGame.currentPlayer}'s turn`;
  }
}

export default handleClickCell;
