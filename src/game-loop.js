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
    this.togglePlayer(btnIndex);
    this.state.player1Move = !this.state.player1Move;
    this.state.totalMoves++;
    // console.log(this.state.Board.winningRows());
    return this.state.Board.getGameBoard();
  }

  togglePlayer(btnIndex) {
    if (this.state.player1Move) {
      this.state.Board.setPlayerPosition(btnIndex, this.state.Player1);
      this.state.Player1.move(btnIndex);
    } else {
      this.state.Board.setPlayerPosition(btnIndex, this.state.Player2);
      this.state.Player2.move(btnIndex);
    }
  }

  checkForWin() {

  }

  incrementGameBoard() {

  }
}