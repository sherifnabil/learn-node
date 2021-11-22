const lib = require('../lib');

test('absloute - should return positive number if the input is positive', () => {
  const result = lib.absolute(1);
  expect(result).toBe(1);
});

test('absloute - should return positive number if the input is negative', () => {
  const result = lib.absolute(-1);
  expect(result).toBe(1);
});

test('absloute - should return 0 if the input is 0', () => {
  const result = lib.absolute(0);
  expect(result).toBe(0);
});