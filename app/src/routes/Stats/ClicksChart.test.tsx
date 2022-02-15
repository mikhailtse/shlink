import { render, screen } from '@testing-library/react';

import ClicksChart from './ClicksChart';

const data = [{
  date: new Date(),
  count: 5,
}];

test('renders a chart when there is any element in data', () => {
  render(
    <ClicksChart data={data} />
  );

  const chart = screen.getByRole('presentation');

  expect(chart).toBeInTheDocument();
});

test('renders a message when there any elements in the data', () => {
  render(
    <ClicksChart data={[]} />
  );

  const messageElement = screen.getByText('There is no any single click');

  expect(messageElement).toBeInTheDocument();
});
