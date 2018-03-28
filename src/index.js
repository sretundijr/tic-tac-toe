import './styles.css';

import GameBoard from './game-board';
import GamePlayLoop from './game-loops/game-loop';
import Player from './player';

import AiEasyLoop from './game-loops/ai-easy-loop';
import AiMediumLoop from './game-loops/ai-medium-loop';

// todo bug fix, this event fires once for every time the player has hit the button
// ie played 5 games and selected a 6th game type this event will fire 6 times
const handleGameTypeSelection = () => {
  const selectionBtnContainer = document.getElementById('user-selection');

  selectionBtnContainer.addEventListener('click', (e) => {
    determineGameType(e.target.value);
  });
}

const determineGameType = (type) => {

  const Board = new GameBoard();
  document.getElementById('game-board').innerHTML = gameBoardBtn(Board.getGameBoard());

  const humanPlayer = new Player('X');
  let GamePlay = '';

  if (type === '2-player') {
    const humanPlayer2 = new Player('O');
    GamePlay = new GamePlayLoop(Board, humanPlayer, humanPlayer2);
    GamePlay.flipForFirstPlay();
  } else if (type === 'easy') {
    const aiPlayer = new Player('O');
    GamePlay = new AiEasyLoop(Board, humanPlayer, aiPlayer);
  } else if (type === 'medium') {
    const aiPlayer = new Player('O');
    GamePlay = new AiMediumLoop(Board, humanPlayer, aiPlayer);
  }
  gameBoardEventListener(GamePlay);
}


// templates
const gameBtnTemplate = (index, value = '') => {
  return `<button id="${index}-btn" class="game-btn">${value}</button>`
}

const gameWinnerModal = (board) => {
  return (
    `
    <div class="modal">
      <h5>Congrats You Won!</h5>
      <div id="modal-game-board" class="game-board-container-style">
        ${gameBoardBtn(board)}
      </div>
    </div>
  `
  )
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
        console.log(isWinner);
        alert(`${isWinner.PlayerObj.getSymbol()}`);
        document.getElementById('game-board').innerHTML = gameWinnerModal(gamePlayLoop.getCurrentBoard());
        // document.getElementById('game-board').innerHTML = gameBoardBtn(Board2.getGameBoard());
        handleGameTypeSelection(Board2);
      }
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  handleGameTypeSelection();
})

