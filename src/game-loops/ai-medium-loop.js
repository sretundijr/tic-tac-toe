
import AiEasyLoop from './ai-easy-loop';

// import GameLoop from './game-loop';

export default class AiMediumLoop extends AiEasyLoop {
  constructor(Board, Human, Ai) {
    super(Board, Human, Ai);
    this.state = {
      Board,
      Human,
      Ai,
    }
  }
}