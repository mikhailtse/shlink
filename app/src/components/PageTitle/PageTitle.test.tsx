import { render, screen } from '@testing-library/react';

import PageTitle from './PageTitle';

const title = 'Heading';

test('renders a heading element with a title', () => {
  render(
    <PageTitle title={title} />
  );

  const headingElement = screen.getByRole('heading');

  expect(headingElement).toBeInTheDocument();
  expect(headingElement.textContent).toBe(title);
});
