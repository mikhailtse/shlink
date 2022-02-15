import AppError from './AppError';

function isObject(val: unknown): val is { [key: string]: any } {
  return val !== null && typeof val === 'object';
}

function isAppError(error: unknown): error is AppError {
  return isObject(error) && error.isAppError === true;
}

export default isAppError;
