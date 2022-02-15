import AppError from './AppError';

test('creates an unknown app error by default', () => {
  const error = new AppError();

  expect(error.isAppError).toBe(true);
  expect(error.code).toBe('unknown');
  expect(error.message).toBe('Something wrong just happened.');
});

test('creates an unknown app error when `code` = "unknown" is provided', () => {
  const error = new AppError('unknown');

  expect(error.isAppError).toBe(true);
  expect(error.code).toBe('unknown');
  expect(error.message).toBe('Something wrong just happened.');
});

test('creates an 404 app error when `code` = "404" is provided', () => {
  const error = new AppError('404');

  expect(error.isAppError).toBe(true);
  expect(error.code).toBe('404');
  expect(error.message).toBe('Page node found.');
});

test('creates an 500 app error when `code` = "500" is provided', () => {
  const error = new AppError('500');

  expect(error.isAppError).toBe(true);
  expect(error.code).toBe('500');
  expect(error.message).toBe('Server error.');
});
