import './styles.css';

import GameBoard from './game-board';
import GamePlayLoop from './game-loops/game-loop';
import Player from './player';

import AiEasyLoop from './game-loops/ai-easy-loop';
import AiMediumLoop from './game-loops/ai-medium-loop';


const handleGameTypeSelection = (Board) => {
  const selectionBtnContainer = document.getElementById('user-selection');

  selectionBtnContainer.addEventListener('click', (e) => {
    determineGameType(e.target.value, Board);
  });
}

const determineGameType = (type, Board) => {
  if (type === '2-player') {
    const humanPlayer = new Player('X');
    const humanPlayer2 = new Player('O');
    const GamePlay = new GamePlayLoop(Board, humanPlayer, humanPlayer2);
    console.log(GamePlay, 'new game');
    GamePlay.flipForFirstPlay();
    classBasedEventListener(GamePlay);
  } else if (type === 'easy') {
    const humanPlayer = new Player('X');
    const aiPlayer = new Player('O');
    const EasyLoop = new AiEasyLoop(Board, humanPlayer, aiPlayer);
    EasyLoop.flipForFirstPlay();
    classBasedEventListener(EasyLoop);

  } else if (type === 'medium') {
    const humanPlayer = new Player('X');
    const aiPlayer = new Player('O');
    const mediumLoop = new AiMediumLoop(Board, humanPlayer, aiPlayer);
    mediumLoop.flipForFirstPlay();
    // gameBoardBtnEvent(mediumLoop);
    classBasedEventListener(mediumLoop);
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

const classBasedEventListener = (gamePlayLoop) => {

  Array.from(document.getElementsByClassName('game-btn')).forEach((item) => {
    item.addEventListener('click', (e) => {
      const btnIndex = parseInt(e.target.id.replace('-btn', ''), 10);
      // play loop is here, game play returns a player status
      // change this to use the same board obj but reset instead of build new board
      const isWinner = gamePlayLoop.play(btnIndex);
      console.log(gamePlayLoop);
      // fix remove gameplayloop get current board and pass in board object?
      document.getElementById('game-board').innerHTML = gameBoardBtn(gamePlayLoop.getCurrentBoard());
      classBasedEventListener(gamePlayLoop);
      // stop and reset
      // todo add reset for tie condition
      if (isWinner && isWinner.winner) {
        const Board2 = new GameBoard();
        console.log('________new loop');
        // just clears the bored for now
        // alert(`${isWinner.PlayerObj.getSymbol()}`);
        document.getElementById('game-board').innerHTML = gameBoardBtn(Board2.getGameBoard());
        handleGameTypeSelection(Board2);
        // classBasedEventListener(gamePlayLoop);
      }
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const Board = new GameBoard();
  document.getElementById('game-board').innerHTML = gameBoardBtn(Board.getGameBoard());
  handleGameTypeSelection(Board);
})

