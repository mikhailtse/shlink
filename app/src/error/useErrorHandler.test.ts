import { renderHook, act } from '@testing-library/react-hooks';

import { BrowserRouter } from 'react-router-dom';

import useErrorHandler from './useErrorHandler';

test('redirects to the error page when `AppError` with `code`="unknown" provided', () => {
  const { result } = renderHook(() => useErrorHandler(), { wrapper: BrowserRouter });

  const { origin } = window.location;

  act(() => {
    result.current({ isAppError: true, code: 'unknown' });
  });

  const { href } = window.location;

  expect(href).toBe(`${origin}/error`);
});

test('redirects to the 404 error page when `AppError` with `code`="404" provided', () => {
  const { result } = renderHook(() => useErrorHandler(), { wrapper: BrowserRouter });

  const { origin } = window.location;

  act(() => {
    result.current({ isAppError: true, code: '404' });
  });

  const { href } = window.location;

  expect(href).toBe(`${origin}/error404`);
});

test('redirects to the 500 error page when `AppError` with `code`="500" provided', () => {
  const { result } = renderHook(() => useErrorHandler(), { wrapper: BrowserRouter });

  const { origin } = window.location;

  act(() => {
    result.current({ isAppError: true, code: '500' });
  });

  const { href } = window.location;

  expect(href).toBe(`${origin}/error500`);
});

test('redirects to the error page when unknown error propvided', () => {
  const { result } = renderHook(() => useErrorHandler(), { wrapper: BrowserRouter });

  const { origin } = window.location;

  act(() => {
    result.current({});
  });

  const { href } = window.location;

  expect(href).toBe(`${origin}/error`);
});

test('redirects to the error page when axios error propvided', () => {
  const { result } = renderHook(() => useErrorHandler(), { wrapper: BrowserRouter });

  const { origin } = window.location;

  act(() => {
    result.current({ isAxiosError: true });
  });

  const { href } = window.location;

  expect(href).toBe(`${origin}/error`);
});

test('redirects to the 404 error page when axios error propvided with response status 404', () => {
  const { result } = renderHook(() => useErrorHandler(), { wrapper: BrowserRouter });

  const { origin } = window.location;

  act(() => {
    result.current({ isAxiosError: true, response: { status: 404 } });
  });

  const { href } = window.location;

  expect(href).toBe(`${origin}/error404`);
});

test('redirects to the 500 error page when axios error propvided with response status 500', () => {
  const { result } = renderHook(() => useErrorHandler(), { wrapper: BrowserRouter });

  const { origin } = window.location;

  act(() => {
    result.current({ isAxiosError: true, response: { status: 500 } });
  });

  const { href } = window.location;

  expect(href).toBe(`${origin}/error500`);
});
