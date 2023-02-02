const add = require('./index.js');

test('Sample unit test: adds two numbers', () => {
    expect(add(2,3)).toBe(5);
});