import isUrl from './isUrl';

test('returns true when string is a url', () => {
  expect(isUrl('http://dd.com')).toBe(true);
});

test('returns false when string is not a url', () => {
  expect(isUrl('http')).toBe(false);
  expect(isUrl('https://')).toBe(false);
  expect(isUrl('string')).toBe(false);
});