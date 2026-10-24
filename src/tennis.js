const NAMES = ['Love', 'Fifteen', 'Thirty', 'Forty'];

export class TennisGame {
  #p1 = 0;
  #p2 = 0;

  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }

  wonPoint(name) {
    if (name === this.player1) this.#p1++;
    else if (name === this.player2) this.#p2++;
    else throw new Error('unknown player');
  }

  score() {
    const [a, b] = [this.#p1, this.#p2];
    if (a === b) return a >= 3 ? 'Deuce' : `${NAMES[a]}-All`;
    if (a >= 4 || b >= 4) {
      const lead = a > b ? this.player1 : this.player2;
      return Math.abs(a - b) === 1 ? `Advantage ${lead}` : `Win for ${lead}`;
    }
    return `${NAMES[a]}-${NAMES[b]}`;
  }
}
