export default class GamePlayLoop {
  constructor(Board, Player1, Player2) {
    this.state = {
      Board,
      Player1,
      Player2,
      totalMoves: 0,
      player1Move: true,
    };
  }

  flipForFirstPlay() {
    const randomStart = Math.floor(Math.random() * 2) + 1
    if (randomStart === 1) {
      return this.state.Player1;
    }
    player1Move: false;
    return this.state.Player2;
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
    if (this.state.player1Move) {
      this.state.Board.setPlayerPosition(btnIndex, this.state.Player1);
    } else {
      this.state.Board.setPlayerPosition(btnIndex, this.state.Player2);
    }
    this.state.totalMoves++;
  }
}