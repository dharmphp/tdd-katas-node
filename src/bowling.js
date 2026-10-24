export class BowlingGame {
  #rolls = [];

  roll(pins) {
    if (pins < 0 || pins > 10) throw new RangeError('pins must be 0..10');
    this.#rolls.push(pins);
  }

  score() {
    const r = this.#rolls;
    let total = 0;
    let i = 0;
    for (let frame = 0; frame < 10; frame++) {
      if (r[i] === 10) {
        total += 10 + (r[i + 1] ?? 0) + (r[i + 2] ?? 0);
        i += 1;
      } else if ((r[i] ?? 0) + (r[i + 1] ?? 0) === 10) {
        total += 10 + (r[i + 2] ?? 0);
        i += 2;
      } else {
        total += (r[i] ?? 0) + (r[i + 1] ?? 0);
        i += 2;
      }
    }
    return total;
  }
}
