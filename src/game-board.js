export default class GameBoard {
  constructor() {
    this.state = {
      gameBoard: ['', '', '', '', '', '', '', '', ''],
    };
  };
  setPlayerPosition(index, PlayerObj) {
    this.state.gameBoard[index] = PlayerObj;
    console.log(this.findWinner(PlayerObj.getSymbol()));
    // return this.winningRows(PlayerObj.symbol);
  }
  getGameBoard() {
    return this.state.gameBoard;
  }
  winningRows(symbol) {
    let row1 = 0, row2 = 0, row3 = 0;
    for (let i = 0; i < this.state.gameBoard.length; i++) {
      if (this.state.gameBoard[i] && this.state.gameBoard[i].getSymbol() === symbol) {
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

  winningColumns(symbol) {
    const col1 = '036';

  }

  findWinner(symbol) {
    if (this.winningColumns(symbol) || this.winningRows(symbol)) {
      return true;
    }
    return false;
  }
}