export default class GameBoard {
  constructor() {
    this.state = {
      gameBoard: ['', '', '', '', '', '', '', '', ''],
    };
  };
  setPlayerPosition(index, PlayerObj) {
    PlayerObj.move(index);
    this.state.gameBoard[index] = PlayerObj;
    console.log(this.findWinner(PlayerObj));
    // return this.winningRows(PlayerObj.symbol);
  }
  getGameBoard() {
    return this.state.gameBoard;
  }
  winningRows(player) {
    let row1 = 0, row2 = 0, row3 = 0;
    for (let i = 0; i < this.state.gameBoard.length; i++) {
      if (this.state.gameBoard[i] && this.state.gameBoard[i].getSymbol() === player.getSymbol()) {
        if (i < 3) {
          row1++;
        } else if (i < 6) {
          row2++;
        } else {
          row3++;
        }
      }
    }
    if (row1 === 3 || row2 === 3 || row3 === 3) {
      return true;
    }
    return false;
  }
  winningColumns(player) {
    const columns = [
      /[036]/g,
      /[147]/g,
      /[258]/g,
    ]
    const playerMoveString = player.getMoves().join('');
    const playerColumns = columns.map((item) => {
      return playerMoveString.match(item);
    })
    let winnerWinner = false;
    playerColumns.forEach((item) => {
      if (item) {
        winnerWinner = (item.length === 3);
      }
    })
    return winnerWinner;
  }

  findWinner(player) {
    if (this.winningRows(player) || this.winningColumns(player)) {
      return true;
    }
    return false;
  }
}