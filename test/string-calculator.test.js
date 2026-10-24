import { test } from 'node:test';
import assert from 'node:assert/strict';
import { add } from '../src/string-calculator.js';

test('empty string is zero', () => assert.equal(add(''), 0));
test('single number', () => assert.equal(add('7'), 7));
test('two numbers', () => assert.equal(add('1,2'), 3));
test('many numbers', () => assert.equal(add('1,2,3,4,5'), 15));
test('newline delimiter', () => assert.equal(add('1\n2,3'), 6));
test('custom delimiter', () => assert.equal(add('//;\n1;2'), 3));
test('negatives throw with all listed', () => {
  assert.throws(() => add('1,-2,-5'), /negatives not allowed: -2, -5/);
});
test('ignores numbers over 1000', () => assert.equal(add('2,1001'), 2));
test('long delimiter', () => assert.equal(add('//[***]\n1***2***3'), 6));
test('multiple delimiters', () => assert.equal(add('//[*][%]\n1*2%3'), 6));
