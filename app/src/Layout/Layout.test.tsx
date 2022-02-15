import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import Layout from './Layout';

test('renders a header and main elements', () => {
  render(
    <Layout />,
    { wrapper: BrowserRouter }
  );

  const headerElement = screen.getByRole('banner');
  const mainElement = screen.getByRole('main');

  expect(headerElement).toBeInTheDocument();
  expect(mainElement).toBeInTheDocument();
});
