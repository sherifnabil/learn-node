const lib = require('../lib');

describe('absloute', () => {
  it('should return positive number if the input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it('should return positive number if the input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it('should return 0 if the input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('greet', () => {
  it('should return a greeting message', () => {
    const result = lib.greet('Sherif');
    expect(result).toMatch(/sherif/i);
    expect(result).toContain('Sherif');
  });
});

describe('getCurrencies', () => {
  it('it should return supported currencies', () => {
    const result = lib.getCurrencies();
    expect(result).toContain('USD');
    expect(result).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']));
  });
});