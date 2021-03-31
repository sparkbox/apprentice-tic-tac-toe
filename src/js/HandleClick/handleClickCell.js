function handleClickCell(cell, subheading, index, currGame) {
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

export default handleClickCell;
