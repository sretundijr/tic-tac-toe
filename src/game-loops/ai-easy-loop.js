import GamePlayLoop from "./game-loop";

// the easy loop chooses random random values that are remaining, very easy to beat
export default class AiEasyLoop extends GamePlayLoop {
  constructor(Board, Human, Ai) {
    super(Board, Human, Ai);
    this.state = {
      Board,
      Human,
      Ai,
    }
  }

  findOpenSpaces() {
    let iteratorForSecondArr = 0;
    const filteredArray = [];
    this.state.Board.getGameBoard().filter((item, index) => {
      if (item === '') {
        filteredArray.push(index);
      }
    });
    return filteredArray;
  }

  randomMove() {
    const availMoves = this.findOpenSpaces();
    const randomMove = availMoves[Math.floor(Math.random() * availMoves.length)];
    return randomMove;
  }

  // override movePlayer for ai implementation
  movePlayer(btnIndex) {

    this.state.winningPlayer = this.state.Board.setPlayerPosition(btnIndex, this.state.Human);
    this.state.totalMoves++;
    this.togglePlayer();

    if (!this.state.winningPlayer.winner) {
      const index = this.randomMove();
      this.state.winningPlayer = this.state.Board.setPlayerPosition(index, this.state.Ai);

      this.state.totalMoves++;
    }
  }
}