import { render, screen } from '@testing-library/react';

import Header from './Header';

test('renders an AppBar with a logo', () => {
  render(
    <Header />
  );

  const headerElement = screen.getByRole('banner');
  const logoElement = screen.getByText('https://shlink');

  expect(headerElement).toBeInTheDocument();
  expect(logoElement).toBeInTheDocument();
});
