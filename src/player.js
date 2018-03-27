export default class Player {
  constructor(symbol) {
    this.state = {
      symbol,
      moves: [],
    }
    this.getSymbol = this.getSymbol.bind(this);
  }
  incrementMoves(index) {
    this.state.moves.push(index);
  }
  getSymbol() {
    return this.state.symbol;
  }
  move(index) {
    this.incrementMoves(index);
    return this.getSymbol();
  }
}