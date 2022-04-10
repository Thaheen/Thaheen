const IsValidCapacity = require('./IsValidCapacity');

test('TEST 1:  capacity is  valid ', () => {
  expect(IsValidCapacity('11')).toBe(true);
});

test('TEST 2:  capacity is not valid: ', () => {
  expect(IsValidCapacity('twenty')).toBe(false);
});

test('TEST 3:  capacity is not valid: ', () => {
  expect(IsValidCapacity('110')).toBe(false);
});

test('TEST 4:  capacity is not valid: ', () => {
  expect(IsValidCapacity('1')).toBe(false);
});

const isValidName = require('./isValidName');

test('TEST 1:  name is  not valid ', () => {
  expect(isValidName('Nourah!')).toBe(false);
});

test('TEST 2:  name is  not valid ', () => {
  expect(isValidName('Nourah1')).toBe(false);
});

test('TEST 3:  name is not  valid ', () => {
  expect(isValidName(' ')).toBe(false);
});

test('TEST 4:  name is  valid: ', () => {
  expect(isValidName('Nourah')).toBe(true);
});

const isValidPassword = require('./isValidPassword');

test('TEST 1:  password is  not valid ', () => {
  expect(isValidPassword('112')).toBe(false);
});

test('TEST 2:  password is  not valid ', () => {
  expect(isValidPassword('Modhi')).toBe(false);
});

test('TEST 3:  password is  valid: ', () => {
  expect(isValidPassword('Modhi123!')).toBe(true);
});

const isValidUsername = require('./isValidUsername');

test('TEST 1:  username is  not valid ', () => {
  expect(isValidUsername('Nourah1')).toBe(true);
});

test('TEST 2:  username is  not valid ', () => {
  expect(isValidUsername('Nourah!')).toBe(false);
});

test('TEST 3:  username is  valid: ', () => {
  expect(isValidUsername('نورة التمامي')).toBe(false);
});

test('TEST 4:  username is not valid: ', () => {
  expect(isValidUsername(' ')).toBe(false);
});

test('TEST 5:  username is  valid: ', () => {
  expect(isValidUsername('')).toBe(false);
});

const isValidPhone = require('./isValidPhone');

test('TEST 1:  phone is  not valid ', () => {
  expect(isValidPhone('05589')).toBe(false);
});

test('TEST 2:  phone is  not valid ', () => {
  expect(isValidPhone('0558941520!')).toBe(false);
});

test('TEST 3:  phone is  not valid: ', () => {
  expect(isValidPhone('نورة التمامي')).toBe(false);
});
test('TEST 4:  phone is not valid: ', () => {
  expect(isValidPhone('٠٥٥٨٩٤١٥٢٠')).toBe(false);
});

test('TEST 5:  phone is  not valid: ', () => {
  expect(isValidPhone('055894152000')).toBe(false);
});

test('TEST 6:  phone is  valid: ', () => {
  expect(isValidPhone(' ')).toBe(false);
});
test('TEST 7:  phone is  valid: ', () => {
  expect(isValidPhone('0448941520')).toBe(false);
});
test('TEST 8:  phone is  valid: ', () => {
  expect(isValidPhone('0558941520')).toBe(true);
});
