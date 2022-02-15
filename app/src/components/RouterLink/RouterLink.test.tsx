import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

import RouterLink from './RouterLink';

const props = {
  title: 'http://test.com',
  to: 'stats',
};

test('renders a link element with a title', () => {
  render(
    <RouterLink {...props} />,
    { wrapper: BrowserRouter },
  );

  const linkElement = screen.getByRole('link');

  expect(linkElement).toBeInTheDocument();
  expect(linkElement.textContent).toBe(props.title);
});

test('redirects to the provided route onClick', () => {
  render(
    <RouterLink {...props} />,
    { wrapper: BrowserRouter },
  );

  const linkElement = screen.getByRole('link');

  const { href } = window.location;

  userEvent.click(linkElement);

  expect(window.location.href).toBe(`${href}${props.to}`);
});
