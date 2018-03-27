export default class GamePlayLoop {
  constructor(Board, Player1, Player2) {
    this.state = {
      Board,
      Player1,
      Player2,
      totalMoves: 0,
      player1Move: false,
    };
  }

  flipForFirstPlay() {
    const randomStart = Math.floor(Math.random() * 2) + 1
    console.log(randomStart);
    if (randomStart === 1) {
      console.log(this.state.Player1);
      this.state.player1Move = true;
    }
  }

  play(btnIndex) {
    // validates click event due to propagation    
    if (!isNaN(btnIndex)) {
      this.movePlayer(btnIndex);
      this.togglePlayer();
    }
    return this.state.Board.getGameBoard();
  }

  togglePlayer() {
    this.state.player1Move = !this.state.player1Move;
  }

  movePlayer(btnIndex) {
    let currentPlayerStatus = '';
    console.log(this.state.player1Move);
    if (this.state.player1Move) {
      currentPlayerStatus = this.state.Board.setPlayerPosition(btnIndex, this.state.Player1);
    } else {
      currentPlayerStatus = this.state.Board.setPlayerPosition(btnIndex, this.state.Player2);
    }
    console.log(currentPlayerStatus);
    this.state.totalMoves++;
  }
}