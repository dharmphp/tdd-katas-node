import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Rover } from '../src/mars-rover.js';

test('starts at origin facing north', () => {
  assert.deepEqual(new Rover().position(), { x: 0, y: 0, heading: 'N' });
});

test('turns right through all headings', () => {
  const r = new Rover();
  assert.equal(r.execute('R').heading, 'E');
  assert.equal(r.execute('R').heading, 'S');
  assert.equal(r.execute('R').heading, 'W');
  assert.equal(r.execute('R').heading, 'N');
});

test('turns left', () => {
  assert.equal(new Rover().execute('L').heading, 'W');
});

test('moves forward and backward', () => {
  const r = new Rover({ x: 2, y: 2 });
  assert.deepEqual(r.execute('FF'), { x: 2, y: 4, heading: 'N' });
  assert.deepEqual(r.execute('RB'), { x: 1, y: 4, heading: 'E' });
});

test('wraps around the grid', () => {
  const r = new Rover({ grid: { w: 5, h: 5 } });
  assert.deepEqual(r.execute('B'), { x: 0, y: 4, heading: 'N' });
  assert.deepEqual(r.execute('LF'), { x: 4, y: 4, heading: 'W' });
});

test('stops before an obstacle and reports it', () => {
  const r = new Rover({ obstacles: [[0, 2]] });
  assert.deepEqual(r.execute('FFF'), { x: 0, y: 1, heading: 'N', blocked: true });
});

test('rejects unknown commands', () => {
  assert.throws(() => new Rover().execute('X'));
});
