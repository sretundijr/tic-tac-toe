
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
    if (this.state.winningPlayer.winner) {
      return this.endGamePlay()
    }
  }

  endGamePlay() {
    return this.state.winningPlayer
  }

  getCurrentBoard() {
    return this.state.Board.getGameBoard();
  }

  togglePlayer() {
    this.state.player1Move = !this.state.player1Move;
  }

  movePlayer(btnIndex) {
    let currentPlayerStatus = '';
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