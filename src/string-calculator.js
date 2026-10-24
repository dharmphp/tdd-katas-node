export function add(input) {
  if (input === '') return 0;
  let body = input;
  let delimiters = ['\n'];
  if (input.startsWith('//')) {
    const end = input.indexOf('\n');
    const spec = input.slice(2, end);
    body = input.slice(end + 1);
    const custom = spec.startsWith('[')
      ? spec.slice(1, -1).split('][')
      : [spec];
    delimiters = [...delimiters, ...custom];
  }
  for (const d of delimiters) body = body.split(d).join(',');
  const numbers = body.split(',').map(Number);
  const negatives = numbers.filter((n) => n < 0);
  if (negatives.length) throw new Error(`negatives not allowed: ${negatives.join(', ')}`);
  return numbers.filter((n) => n <= 1000).reduce((a, b) => a + b, 0);
}
