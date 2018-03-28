import './styles.css';

import GameBoard from './game-board';
import GamePlayLoop from './game-loops/game-loop';
import Player from './player';

import AiEasyLoop from './game-loops/ai-easy-loop';
import AiMediumLoop from './game-loops/ai-medium-loop';

// todo bug fix, this event fires once for every time the player has hit the button
// ie played 5 games and selected a 6th game type this event will fire 6 times
const handleGameTypeSelection = (Board) => {
  const selectionBtnContainer = document.getElementById('user-selection');

  selectionBtnContainer.addEventListener('click', (e) => {
    determineGameType(e.target.value, Board);
  });
}

const determineGameType = (type, Board) => {
  const humanPlayer = new Player('X');

  if (type === '2-player') {
    const humanPlayer2 = new Player('O');
    const GamePlay = new GamePlayLoop(Board, humanPlayer, humanPlayer2);
    GamePlay.flipForFirstPlay();
  } else if (type === 'easy') {
    const aiPlayer = new Player('O');
    const GamePlay = new AiEasyLoop(Board, humanPlayer, aiPlayer);
  } else if (type === 'medium') {
    const aiPlayer = new Player('O');
    const GamePlay = new AiMediumLoop(Board, humanPlayer, aiPlayer);
  }
  gameBoardEventListener(GamePlay);
}

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

const gameBoardEventListener = (gamePlayLoop) => {

  Array.from(document.getElementsByClassName('game-btn')).forEach((item) => {
    item.addEventListener('click', (e) => {
      const btnIndex = parseInt(e.target.id.replace('-btn', ''), 10);
      // play loop is here, game play returns a player status
      // change this to use the same board obj but reset instead of build new board
      const isWinner = gamePlayLoop.play(btnIndex);
      console.log(gamePlayLoop);
      // fix remove gameplayloop get current board and pass in board object?
      document.getElementById('game-board').innerHTML = gameBoardBtn(gamePlayLoop.getCurrentBoard());
      gameBoardEventListener(gamePlayLoop);
      // stop and reset
      // todo add reset for tie condition
      if (isWinner && isWinner.winner) {
        const Board2 = new GameBoard();
        console.log('________new loop');
        // just clears the bored for now
        // alert(`${isWinner.PlayerObj.getSymbol()}`);
        document.getElementById('game-board').innerHTML = gameBoardBtn(Board2.getGameBoard());
        handleGameTypeSelection(Board2);
      }
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const Board = new GameBoard();
  document.getElementById('game-board').innerHTML = gameBoardBtn(Board.getGameBoard());
  handleGameTypeSelection(Board);
})

