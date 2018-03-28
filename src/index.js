import './styles.css';

import GameBoard from './game-board';
import GamePlayLoop from './game-loops/game-loop';
import Player from './player';

import AiEasyLoop from './game-loops/ai-easy-loop';
import AiMediumLoop from './game-loops/ai-medium-loop';


const handleGameTypeSelection = (Board) => {
  const selectionBtnContainer = document.getElementById('user-selection');

  selectionBtnContainer.addEventListener('click', (e) => {
    console.log(e.target.value);
    determineGameType(e.target.value, Board);
  });
}

const determineGameType = (type, Board) => {
  if (type === '2-player') {
    const humanPlayer = new Player('X');
    const humanPlayer2 = new Player('O');
    const GamePlay = new GamePlayLoop(Board, humanPlayer, humanPlayer2);
    GamePlay.flipForFirstPlay();
    gameBoardBtnEvent(GamePlay);
  } else if (type === 'easy') {
    const humanPlayer = new Player('X');
    const aiPlayer = new Player('O');
    const EasyLoop = new AiEasyLoop(Board, humanPlayer, aiPlayer);
    EasyLoop.flipForFirstPlay();
    gameBoardBtnEvent(EasyLoop);
  } else if (type === 'medium') {
    const humanPlayer = new Player('X');
    const aiPlayer = new Player('O');
    const mediumLoop = new AiMediumLoop(Board, humanPlayer, aiPlayer);
    console.log(mediumLoop);
    mediumLoop.flipForFirstPlay();
    gameBoardBtnEvent(mediumLoop);
    console.log(mediumLoop.getCurrentBoard());
  }
}

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

const gameBoardBtnEvent = (Game) => {
  document.getElementById('game-board').addEventListener('click', (e) => {
    const btnIndex = parseInt(e.target.id.replace('-btn', ''), 10);

    const isWinner = Game.play(btnIndex);
    document.getElementById('game-board').innerHTML = gameBoardBtn(Game.getCurrentBoard());
    // stop and reset
    if (isWinner && isWinner.winner) {
      const Board = new GameBoard();
      // just clears the bored for now
      document.getElementById('game-board').innerHTML = gameBoardBtn(Board.getGameBoard());
      handleGameTypeSelection(Board);
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const Board = new GameBoard();
  document.getElementById('game-board').innerHTML = gameBoardBtn(Board.getGameBoard());
  handleGameTypeSelection(Board);
})

