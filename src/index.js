import './styles.css';

import GameBoard from './game-board';
import GamePlayLoop from './game-loop';
import Player from './player';

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

    document.getElementById('game-board').innerHTML = gameBoardBtn(Game.play(btnIndex));
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const Board = new GameBoard();
  document.getElementById('game-board').innerHTML = gameBoardBtn(Board.getGameBoard());
  const humanPlayer = new Player('X');
  const aiPlayer = new Player('O');

  // const GamePlay = new GamePlayLoop();

  const GamePlay = new GamePlayLoop(Board, humanPlayer, aiPlayer);
  GamePlay.flipForFirstPlay();
  gameBoardBtnEvent(GamePlay);
})