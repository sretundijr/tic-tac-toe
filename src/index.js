import './styles.css';

const gameBtnTemplate = (index) => {
  return `<button id="${index}-btn" class="game-btn" value=""></button>`
}

const gameBoardBtn = () => {
  const btnArray = [];
  for (let i = 0; i < 9; i++) {
    btnArray.push(gameBtnTemplate(i));
  }
  return btnArray.join('');
}

const gameBoardBtnEvent = () => {
  let btnIndex = '';
  document.getElementById('game-board').addEventListener('click', (e) => {
    btnIndex = e.target.id.replace('-btn', '');
  })
  return btnIndex;
}

class GameBoard {
  constructor() {
    this.state = {
      gameBoard: [],
    };
  };
  setPlayerPosition(index, PlayerObj) {
    this.state.gameBoard[index] = PlayerObj;
  }
}

class Player {
  constructor() {
    this.state = {
      symbol: '',
      numberOfMoves: '',
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('game-board').innerHTML = gameBoardBtn();
  gameBoardBtnEvent();
})