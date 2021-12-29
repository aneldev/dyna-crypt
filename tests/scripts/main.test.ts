declare let jasmine: any, describe: any, expect: any, it: any;

if (typeof jasmine !== 'undefined') jest.setTimeout(2000);

// Help: https://facebook.github.io/jest/docs/expect.html

describe('Internal module test', () => {
  it('should do this', () => {
    expect(true).toBe(true);
  });
});
