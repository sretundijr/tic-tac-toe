export default class GameBoard {
  constructor() {
    this.state = {
      gameBoard: ['', '', '', '', '', '', '', '', ''],
    };
  };
  // rename this
  setPlayerPosition(index, PlayerObj) {
    PlayerObj.move(index);
    this.state.gameBoard[index] = PlayerObj;
    return {
      winner: this.isWinner(PlayerObj),
      PlayerObj,
    }
  }
  // game board is only used for rendering?
  getGameBoard() {
    return this.state.gameBoard;
  }
  // todo check for win using regex
  winningRows(listOfMoves) {
    // let row1 = 0, row2 = 0, row3 = 0;
    // for (let i = 0; i < this.state.gameBoard.length; i++) {
    //   if (this.state.gameBoard[i] && this.state.gameBoard[i].getSymbol() === player.getSymbol()) {
    //     if (i < 3) {
    //       row1++;
    //     } else if (i < 6) {
    //       row2++;
    //     } else {
    //       row3++;
    //     }
    //   }
    // }
    // if (row1 === 3 || row2 === 3 || row3 === 3) {
    //   return true;
    // }
    // return false;
    const rows = [
      /[012]/g,
      /[345]/g,
      /[678]/g,
    ];
    return this.isWinningCombo(rows, listOfMoves)
  }
  winningColumns(listOfMoves) {
    const columns = [
      /[036]/g,
      /[147]/g,
      /[258]/g,
    ]
    return this.isWinningCombo(columns, listOfMoves);
  }

  isWinningCombo(winningCombos, listOfMoves) {
    const playerMoveString = listOfMoves.join('');
    const playerColumns = winningCombos.map((item) => {
      return playerMoveString.match(item);
    })
    let winnerWinner = false;
    playerColumns.forEach((item) => {
      if (item) {
        if (item.length === 3) {
          winnerWinner = true;
        }
      }
    })
    return winnerWinner;
  }

  diagnolWin(listOfMoves) {
    const angles = [
      /[048]/g,
      /[246]/g,
    ];

    return this.isWinningCombo(angles, listOfMoves);
  }

  isWinner(player) {
    if (this.winningRows(player.getMoves()) ||
      this.winningColumns(player.getMoves()) || this.diagnolWin(player.getMoves())) {
      return true;
    }
    return false;
  }
}