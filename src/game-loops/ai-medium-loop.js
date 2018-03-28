
import AiEasyLoop from './ai-easy-loop';

// todo find winning moves to increase the difficulty
export default class AiMediumLoop extends AiEasyLoop {
  constructor(Board, Human, Ai) {
    super(Board, Human, Ai);
    this.state = {
      Board,
      Human,
      Ai,
      totalMoves: 0,
    }
  }

  findBetterMoveThenRandom() {
    let gamePlayCombos = [];
    const moves = this.state.Human.getMoves().map(item => item);
    const movesListFirstOpenIndex = moves.length;
    // currently finds a winning move for human
    this.findOpenSpaces().forEach((item) => {
      moves[movesListFirstOpenIndex] = item;
      console.log(item, 'item');
      gamePlayCombos.push({
        winner: this.state.Board.isWinner(moves),
        moves: moves.slice(),
      });
    });

    return gamePlayCombos.filter(item => (item.winner === true));
  }

  determineIfOpponentHasOneMoveWin() {
    const openSpace = this.findOpenSpaces();
    const board = this.getCurrentBoard();

  }

  // override the easy loop implementation
  movePlayer(btnIndex) {
    this.state.winningPlayer = this.state.Board.setPlayerPosition(btnIndex, this.state.Human);
    this.state.totalMoves++;
    this.togglePlayer();

    if (!this.state.winningPlayer.winner) {
      if (this.state.totalMoves >= 2 && this.state.totalMoves < 7) {
        let index = '';
        const betterMoveList = this.findBetterMoveThenRandom();
        console.log(betterMoveList, 'bettermovelist');
        if (betterMoveList.length > 0) {
          index = betterMoveList[0].moves.pop();
        } else {
          index = this.randomMove();
        }
        this.state.winningPlayer = this.state.Board.setPlayerPosition(index, this.state.Ai);
      } else {
        const index = this.randomMove();
        this.state.winningPlayer = this.state.Board.setPlayerPosition(index, this.state.Ai);
      }

      this.state.totalMoves++;
    }
  }
}