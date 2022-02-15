import { render, screen } from '@testing-library/react';

import PageSubTitle from './PageSubTitle';

const title = 'Heading';

test('renders a heading element with a title', () => {
  render(
    <PageSubTitle title={title} />
  );

  const headingElement = screen.getByRole('heading');

  expect(headingElement).toBeInTheDocument();
  expect(headingElement.textContent).toBe(title);
});
