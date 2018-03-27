import './styles.css';

import GameBoard from './game-board';
import GamePlayLoop from './game-loop';
import Player from './player';

import AiEasyLoop from './ai-easy-loop';

// fix this, rafactor to new file with other templates
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

export default function gameBoardBtnEvent(Game) {
  document.getElementById('game-board').addEventListener('click', (e) => {
    const btnIndex = parseInt(e.target.id.replace('-btn', ''), 10);

    // todo change this, make a different function to return the game board
    Game.play(btnIndex);
    document.getElementById('game-board').innerHTML = gameBoardBtn(Game.getCurrentBoard());
    // if (true) {
    //   Game.play();
    // }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const Board = new GameBoard();
  document.getElementById('game-board').innerHTML = gameBoardBtn(Board.getGameBoard());
  const humanPlayer = new Player('X');
  const aiPlayer = new Player('O');

  // const GamePlay = new GamePlayLoop(Board, humanPlayer, aiPlayer);
  // GamePlay.flipForFirstPlay();
  // gameBoardBtnEvent(GamePlay);

  const EasyLoop = new AiEasyLoop(Board, humanPlayer, aiPlayer);
  // EasyLoop.flipForFirstPlay();
  gameBoardBtnEvent(EasyLoop);
})

