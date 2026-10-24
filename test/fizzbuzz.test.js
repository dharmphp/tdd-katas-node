import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fizzbuzz } from '../src/fizzbuzz.js';

test('returns the number as string', () => {
  assert.equal(fizzbuzz(1), '1');
  assert.equal(fizzbuzz(2), '2');
});

test('multiples of three', () => {
  assert.equal(fizzbuzz(3), 'Fizz');
  assert.equal(fizzbuzz(9), 'Fizz');
});

test('multiples of five', () => {
  assert.equal(fizzbuzz(5), 'Buzz');
  assert.equal(fizzbuzz(20), 'Buzz');
});

test('multiples of both', () => {
  assert.equal(fizzbuzz(15), 'FizzBuzz');
  assert.equal(fizzbuzz(45), 'FizzBuzz');
});
