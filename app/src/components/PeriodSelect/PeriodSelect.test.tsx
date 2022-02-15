import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PeriodSelect from './PeriodSelect';

test('renders a select element with a value', () => {
  render(
    <PeriodSelect value="1" />
  );

  const selectElement = screen.getByRole('button');

  expect(selectElement).toBeInTheDocument();
  expect(selectElement.textContent).toBe('1 month');
});

test('triggers onChange event with a selected value', async () => {
  let selectValue;
  const handleOnChange = jest.fn((val) => {
    selectValue = val;
  });

  render(
    <PeriodSelect value="1" onChange={handleOnChange} />
  );

  const selectElement = screen.getByRole('button');

  userEvent.click(selectElement);

  await waitFor(() => screen.findAllByRole('option'))

  const liElements = screen.getAllByRole('option');
  const liElement = liElements.find((el) => el.getAttribute('data-value') === '6');

  if (!liElement) {
    throw new Error('Element not found');
  }

  userEvent.click(liElement);

  expect(selectValue).toBe('6');
});
