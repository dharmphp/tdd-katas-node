const TABLE = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

export function toRoman(n) {
  if (!Number.isInteger(n) || n < 1 || n > 3999) {
    throw new RangeError('out of range');
  }
  let out = '';
  for (const [value, glyph] of TABLE) {
    while (n >= value) {
      out += glyph;
      n -= value;
    }
  }
  return out;
}

export function fromRoman(s) {
  let i = 0;
  let total = 0;
  for (const [value, glyph] of TABLE) {
    while (s.startsWith(glyph, i)) {
      total += value;
      i += glyph.length;
    }
  }
  if (i !== s.length || toRoman(total) !== s) throw new SyntaxError('invalid numeral');
  return total;
}
