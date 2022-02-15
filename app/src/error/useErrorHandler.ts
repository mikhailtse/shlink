import { useCallback } from 'react'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import isAppError from './isAppError';

function getErrorCode(error: unknown) {
  if (axios.isAxiosError(error) && error.response?.status) {
    return error.response.status.toString();
  }
  if (isAppError(error)) {
    return error.code;
  }
  return 'unknown';
}

function useErrorHandler() {
  const navigate = useNavigate()

  const handleError = useCallback((error: unknown) => {
    const code = getErrorCode(error);
    switch(code) {
      case '404':
        navigate('/error404', { replace: true });
        break;
      case '500':
        navigate('/error500', { replace: true });
        break;
      default:
        navigate('/error', { replace: true });
        break;
    }
  }, [navigate])

  return handleError;
}

export default useErrorHandler;
