import { screen, waitFor } from '@testing-library/react';

import { mockApi, mockLinkId } from '../../test/server';
import renderRouterElement from '../../test/utils/renderRouterElement';

import Stats from './Stats';

mockApi();

test('renders stats page', async () => {
  renderRouterElement(
    <Stats />,
    { route: `/stats/${mockLinkId}`, path: '/stats/:id' }
  );

  await waitFor(() => screen.findByText('Here my stats'));

  const headingElement = screen.getByText('Here my stats');
  const selectElement = screen.getByRole('button');

  expect(headingElement).toBeInTheDocument();
  expect(selectElement).toBeInTheDocument();
});
