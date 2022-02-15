import { render, screen } from '@testing-library/react';

import ErrorPage from './ErrorPage';

test('renders a heading with a message', () => {
  render(
    <ErrorPage message='some message' />,
  );

  const headingElement = screen.getByRole('heading');

  expect(headingElement).toBeInTheDocument();
  expect(headingElement.textContent).toBe('some message');
});
