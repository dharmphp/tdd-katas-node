import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { BowlingGame } from '../src/bowling.js';

let game;
beforeEach(() => { game = new BowlingGame(); });

const rollMany = (n, pins) => { for (let i = 0; i < n; i++) game.roll(pins); };

test('gutter game', () => {
  rollMany(20, 0);
  assert.equal(game.score(), 0);
});

test('all ones', () => {
  rollMany(20, 1);
  assert.equal(game.score(), 20);
});

test('one spare', () => {
  game.roll(5); game.roll(5); game.roll(3);
  rollMany(17, 0);
  assert.equal(game.score(), 16);
});

test('one strike', () => {
  game.roll(10); game.roll(3); game.roll(4);
  rollMany(16, 0);
  assert.equal(game.score(), 24);
});

test('perfect game', () => {
  rollMany(12, 10);
  assert.equal(game.score(), 300);
});

test('all spares', () => {
  rollMany(21, 5);
  assert.equal(game.score(), 150);
});

test('invalid roll', () => {
  assert.throws(() => game.roll(11), RangeError);
});
