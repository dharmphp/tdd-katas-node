import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toRoman, fromRoman } from '../src/roman.js';

const cases = [
  [1, 'I'], [4, 'IV'], [9, 'IX'], [14, 'XIV'], [40, 'XL'],
  [90, 'XC'], [400, 'CD'], [1994, 'MCMXCIV'], [3999, 'MMMCMXCIX'],
];

for (const [n, r] of cases) {
  test(`${n} -> ${r}`, () => assert.equal(toRoman(n), r));
  test(`${r} -> ${n}`, () => assert.equal(fromRoman(r), n));
}

test('rejects out of range', () => {
  assert.throws(() => toRoman(0), RangeError);
  assert.throws(() => toRoman(4000), RangeError);
  assert.throws(() => toRoman(1.5), RangeError);
});

test('rejects malformed numerals', () => {
  assert.throws(() => fromRoman('IIII'), SyntaxError);
  assert.throws(() => fromRoman('VX'), SyntaxError);
  assert.throws(() => fromRoman('ABC'), SyntaxError);
});
