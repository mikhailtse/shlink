import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';
import { apiUrl } from '../../api/links';

import { mockApi, mockLinkId } from '../../test/server';

import Main from './Main';

mockApi();

test('renders a main page without shortent links', () => {
  render(
    <Main />
  );

  const headings = screen.getAllByRole('heading');
  const inputs = screen.getAllByRole('textbox');
  const buttons = screen.getAllByRole('button');

  expect(headings.length).toBe(1);
  expect(inputs.length).toBe(1);
  expect(buttons.length).toBe(1);
  expect(headings[0]).toBeInTheDocument();
  expect(inputs[0]).toBeInTheDocument();
  expect(buttons[0]).toBeInTheDocument();
});

test('renders a shortent link layout on button click', async () => {
  render(
    <Main />,
    { wrapper: BrowserRouter }
  );

  const inputElement = screen.getByRole('textbox');
  const buttonElement = screen.getByRole('button');

  inputElement.focus();
  userEvent.keyboard('http://google.com');
  userEvent.click(buttonElement);

  await waitFor(() => screen.findByText('Here we go!'));

  const { origin } = window.location;

  const statsLink = screen.getByText(`${origin}/stats/${mockLinkId}`);
  const shortLink = screen.getByText(`${apiUrl}/${mockLinkId}`);

  expect(statsLink).toBeInTheDocument();
  expect(shortLink).toBeInTheDocument();
});
