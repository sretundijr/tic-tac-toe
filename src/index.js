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
  setGameBoardHtml(gameBoardBtn(Board.getGameBoard()));
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

const setGameBoardHtml = (html) => {
  document.getElementById('game-board').innerHTML = html;
}

// templates
const gameBtnTemplate = (index, value = '') => {
  return `<button id="${index}-btn" class="game-btn">${value}</button>`
}

const gameWinnerModal = (symbol, board) => {
  return (
    `
    <div class="modal">
      <h5>Congrats ${symbol}'s!</h5>
      <div id="modal-game-board" class="game-board-container-style">
        ${gameBoardBtn(board)}
      </div>
      <div>
        <h5>To Play again select a game type
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
      const isWinner = gamePlayLoop.play(btnIndex);
      console.log(gamePlayLoop);
      setGameBoardHtml(gameBoardBtn(gamePlayLoop.getCurrentBoard()));
      gameBoardEventListener(gamePlayLoop);
      // stop and reset
      // todo add reset for tie condition
      if (isWinner && isWinner.winner) {
        console.log('________new loop');
        console.log(isWinner);
        setGameBoardHtml(
          gameWinnerModal(
            isWinner.PlayerObj.getSymbol(),
            gamePlayLoop.getCurrentBoard()))
        handleGameTypeSelection();
      }
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  setGameBoardHtml(gameBoardBtn(['', '', '', '', '', '', '', '', '']));
  handleGameTypeSelection();
})

