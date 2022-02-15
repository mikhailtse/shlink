import { queries, Queries, render, RenderOptions, RenderResult } from '@testing-library/react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function renderRouterElement<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
>(
  ui: React.ReactElement,
  { route = '/', path = '/', ...renderOptions }: RenderOptions<Q, Container> & { route: string, path: string }
): RenderResult<Q, Container> {
  window.history.pushState({}, 'Test Page', route);

  return render(
    <Routes>
      <Route path={path} element={ui} />
    </Routes>,
    { wrapper: BrowserRouter, ...renderOptions },
  );
}

export default renderRouterElement;
