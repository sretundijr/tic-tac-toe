
// game play loop allows for two player mode.
// it also serves as parent class for ai easy loop
// the only method overriden by child classes is 
// move player all other methods are reused as is
// by child classes
export default class GamePlayLoop {
  constructor(Board, Player1, Player2) {
    this.state = {
      Board,
      Player1,
      Player2,
      totalMoves: 0,
      player1Move: false,
      winningPlayer: '',
    };
  }

  flipForFirstPlay() {
    const randomStart = Math.floor(Math.random() * 2) + 1
    if (randomStart === 1) {
      this.state.player1Move = true;
    }
  }

  play(btnIndex) {
    // validates click event due to propagation
    if (!isNaN(btnIndex)) {
      this.movePlayer(btnIndex);
      this.togglePlayer();
    }
    // checks for draw??
    if (this.state.winningPlayer.winner || this.state.totalMoves === 9) {
      return this.endGamePlay()
    }
  }

  // todo add stop condition for a tie game
  endGamePlay() {
    return this.state.winningPlayer
  }

  getCurrentBoard() {
    return this.state.Board.getGameBoard();
  }

  togglePlayer() {
    this.state.player1Move = !this.state.player1Move;
  }

  // overriden by child classes
  movePlayer(btnIndex) {
    if (this.state.player1Move) {
      this.state.winningPlayer = this.state.Board
        .setPlayerPosition(btnIndex, this.state.Player1);
    } else {
      this.state.winningPlayer = this.state.Board
        .setPlayerPosition(btnIndex, this.state.Player2);
    }
    this.state.totalMoves++;
  }
}