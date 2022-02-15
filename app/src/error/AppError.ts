type ErrorCode =
  | '404'
  | '500'
  | 'unknown';

function getErrorMessage(code: ErrorCode) {
  switch(code) {
    case '404':
      return 'Page node found.';
    case '500':
      return 'Server error.';
    default:
      return 'Something wrong just happened.';
  }
}

export default class AppError extends Error {
  isAppError = true;

  code: string;

  constructor(code: ErrorCode = 'unknown') {
    super(getErrorMessage(code));
    this.code = code;
  }
}
