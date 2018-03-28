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
      winner: this.isWinner(PlayerObj.getMoves()),
      PlayerObj,
    }
  }
  // game board is only used for rendering?
  getGameBoard() {
    return this.state.gameBoard;
  }
  // todo check for win using regex
  winningRows(listOfMoves) {
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


  // change this to accept only a list
  isWinner(moves) {
    if (this.winningRows(moves) || this.winningColumns(moves) || this.diagnolWin(moves)) {
      return true;
    }
    return false;
  }
}