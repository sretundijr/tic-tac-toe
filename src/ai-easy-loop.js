import GamePlayLoop from "./game-loop";

import gameBoardBtn from './index';

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
    console.log(availMoves.length, 'avail');
    console.log(Math.floor(Math.random() * availMoves.length), 'random');
    const randomMove = availMoves[Math.floor(Math.random() * availMoves.length)];
    return randomMove;
  }

  // override movePlayer for ai implementation
  movePlayer(btnIndex) {

    const currentPlayerStatus1 = this.state.Board.setPlayerPosition(btnIndex, this.state.Human);
    this.state.totalMoves++;
    this.togglePlayer();

    const index = this.randomMove();
    console.log(index, 'chosen index');
    const currentPlayerStatus2 = this.state.Board.setPlayerPosition(index, this.state.Ai);

    this.state.totalMoves++;

    console.log(currentPlayerStatus1);
    console.log(currentPlayerStatus2);

  }
}