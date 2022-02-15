import isAppError from './isAppError';

test('returns true when object has property isAppError', () => {
  const error = {
    isAppError: true,
  };

  const result = isAppError(error);

  expect(result).toBe(true);
});

test('returns false when object does not have property isAppError', () => {
  const error = {};

  const result = isAppError(error);

  expect(result).toBe(false);
});

test('returns false when it is not an object or null', () => {
  expect(isAppError(true)).toBe(false);
  expect(isAppError([])).toBe(false);
  expect(isAppError(null)).toBe(false);
  expect(isAppError(5)).toBe(false);
  expect(isAppError('some string')).toBe(false);
});
