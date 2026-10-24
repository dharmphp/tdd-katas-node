const DIRS = ['N', 'E', 'S', 'W'];
const STEP = { N: [0, 1], E: [1, 0], S: [0, -1], W: [-1, 0] };

export class Rover {
  constructor({ x = 0, y = 0, heading = 'N', grid = { w: 10, h: 10 }, obstacles = [] } = {}) {
    this.x = x;
    this.y = y;
    this.heading = heading;
    this.grid = grid;
    this.obstacles = new Set(obstacles.map(([ox, oy]) => `${ox},${oy}`));
  }

  execute(commands) {
    for (const c of commands) {
      if (c === 'L' || c === 'R') this.#turn(c);
      else if (c === 'F' || c === 'B') {
        if (!this.#move(c)) return { ...this.position(), blocked: true };
      } else throw new Error(`unknown command ${c}`);
    }
    return this.position();
  }

  position() {
    return { x: this.x, y: this.y, heading: this.heading };
  }

  #turn(c) {
    const i = DIRS.indexOf(this.heading);
    this.heading = DIRS[(i + (c === 'R' ? 1 : 3)) % 4];
  }

  #move(c) {
    const [dx, dy] = STEP[this.heading];
    const sign = c === 'F' ? 1 : -1;
    const nx = (this.x + dx * sign + this.grid.w) % this.grid.w;
    const ny = (this.y + dy * sign + this.grid.h) % this.grid.h;
    if (this.obstacles.has(`${nx},${ny}`)) return false;
    this.x = nx;
    this.y = ny;
    return true;
  }
}
