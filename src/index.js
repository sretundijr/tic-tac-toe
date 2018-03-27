import './styles.css';

const gameBtnTemplate = (index, value = '') => {
  return `<button id="${index}-btn" class="game-btn">${value}</button>`
}

const gameBoardBtn = (board) => {
  const btnArray = board.map((item, index) => {
    if (item) {
      return gameBtnTemplate(index, item.getSymbol());
    }
    return gameBtnTemplate(index);
  })
  return btnArray.join('');
}

const gameBoardBtnEvent = (Game) => {
  document.getElementById('game-board').addEventListener('click', (e) => {
    const btnIndex = parseInt(e.target.id.replace('-btn', ''), 10);
    // player.incrementMoves();
    // board.setPlayerPosition(btnIndex, player);
    // console.log(board.getGameBoard());
    console.log(Game.state.Human);
    // Game.play(btnIndex);
    document.getElementById('game-board').innerHTML = gameBoardBtn(Game.play(btnIndex));
  })
}

class GamePlayLoop {
  constructor(Board, Human, Ai) {
    this.state = {
      Board,
      Human,
      Ai,
      totalMoves: 0,
    };
  }

  play(btnIndex) {
    if (this.state.totalMoves % 2 === 0) {
      this.state.Board.setPlayerPosition(btnIndex, this.state.Human);
      this.state.Human.move();
      console.log(this.state.Human);
      console.log(this.state.Board);

    } else {
      this.state.Board.setPlayerPosition(btnIndex, this.state.Ai);
      this.state.Ai.move();

      console.log(this.state.Ai);
    }
    this.state.totalMoves++;
    return this.state.Board.getGameBoard();
  }

  incrementGameBoard() {

  }

  togglePlayer(currentPlayer) {

  }
}

class GameBoard {
  constructor() {
    this.state = {
      gameBoard: ['', '', '', '', '', '', '', '', ''],
    };
  };
  setPlayerPosition(index, PlayerObj) {
    this.state.gameBoard[index] = PlayerObj;
  }
  getGameBoard() {
    return this.state.gameBoard;
  }
}

class Player {
  constructor(symbol) {
    this.state = {
      symbol,
      numberOfMoves: 0,
    }
  }
  incrementMoves() {
    this.state.numberOfMoves++;
  }
  getSymbol() {
    return this.state.symbol;
  }
  move() {
    this.incrementMoves();
    return this.getSymbol();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const Game = new GameBoard();
  document.getElementById('game-board').innerHTML = gameBoardBtn(Game.getGameBoard());
  const humanPlayer = new Player('X');
  const aiPlayer = new Player('O');

  const GamePlay = new GamePlayLoop(Game, humanPlayer, aiPlayer);

  // fist move to human
  gameBoardBtnEvent(GamePlay);
})