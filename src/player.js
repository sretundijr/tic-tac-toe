

export default class Player {
  constructor(symbol) {
    this.state = {
      symbol,
      moves: [],
    }
    this.getSymbol = this.getSymbol.bind(this);
    this.getMoves = this.getMoves.bind(this);
    this.move = this.move.bind(this);
    this.setMoves = this.setMoves.bind(this);
  }
  setMoves(list) {
    this.state.moves = list;
  }
  incrementMoves(index) {
    this.state.moves.push(index);
  }
  getSymbol() {
    return this.state.symbol;
  }
  getMoves() {
    return this.state.moves;
  }
  move(index) {
    this.incrementMoves(index);
  }
}