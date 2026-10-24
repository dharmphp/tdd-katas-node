import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TennisGame } from '../src/tennis.js';

function play(p1Points, p2Points) {
  const g = new TennisGame('A', 'B');
  for (let i = 0; i < Math.max(p1Points, p2Points); i++) {
    if (i < p1Points) g.wonPoint('A');
    if (i < p2Points) g.wonPoint('B');
  }
  return g.score();
}

const cases = [
  [0, 0, 'Love-All'], [1, 1, 'Fifteen-All'], [2, 2, 'Thirty-All'],
  [3, 3, 'Deuce'], [4, 4, 'Deuce'],
  [1, 0, 'Fifteen-Love'], [0, 1, 'Love-Fifteen'], [3, 2, 'Forty-Thirty'],
  [4, 0, 'Win for A'], [0, 4, 'Win for B'],
  [4, 3, 'Advantage A'], [3, 4, 'Advantage B'], [5, 4, 'Advantage A'],
  [6, 4, 'Win for A'],
];

for (const [a, b, expected] of cases) {
  test(`${a}:${b} => ${expected}`, () => assert.equal(play(a, b), expected));
}

test('unknown player', () => {
  const g = new TennisGame('A', 'B');
  assert.throws(() => g.wonPoint('C'));
});
