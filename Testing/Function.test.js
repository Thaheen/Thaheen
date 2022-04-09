const IsValidCapacity = require('./IsValidCapacity');

test('TEST 1:  capacity is  valid ', () => {
  expect(IsValidCapacity('11')).toBe(true);
});

test('TEST 2:  capacity is not valid: ', () => {
  expect(IsValidCapacity('twenty')).toBe(false);
});


