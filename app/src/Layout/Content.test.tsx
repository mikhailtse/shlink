import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import Content from './Content';

test('renders a main element', () => {
  render(
    <Content />,
    { wrapper: BrowserRouter }
  );

  const mainElement = screen.getByRole('main');

  expect(mainElement).toBeInTheDocument();
});
