import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import ShortentLink from './ShortentLink';

const props = {
  statsRoute: 'stats route',
  statsLink: 'stats link',
  shortLink: 'short link',
};

test('renders 2 links', () => {
  render(
    <ShortentLink {...props} />,
    { wrapper: BrowserRouter }
  );

  const linkElements = screen.getAllByRole<HTMLLinkElement>('link');

  expect(linkElements.length).toBe(2);
});

test('renders 2 buttons', () => {
  render(
    <ShortentLink {...props} />,
    { wrapper: BrowserRouter }
  );

  const butttonElements = screen.getAllByRole<HTMLButtonElement>('button');

  expect(butttonElements.length).toBe(2);
});

test('renders a "stats" link', () => {
  render(
    <ShortentLink {...props} />,
    { wrapper: BrowserRouter }
  );

  const linkElements = screen.getAllByRole<HTMLLinkElement>('link');
  const statsLink = linkElements.find((el) => el.getAttribute('data-test-type') === 'inner');

  if (!statsLink) {
    throw new Error('Element not found');
  }

  expect(statsLink).toBeInTheDocument();
  expect(statsLink.textContent).toBe(props.statsLink);
  expect(statsLink).toHaveAttribute('href', `/${props.statsRoute}`);
});

test('renders a "short" link', () => {
  render(
    <ShortentLink {...props} />,
    { wrapper: BrowserRouter }
  );

  const linkElements = screen.getAllByRole<HTMLLinkElement>('link');
  const shortLink = linkElements.find((el) => el.getAttribute('data-test-type') === 'outer');

  if (!shortLink) {
    throw new Error('Element not found');
  }

  expect(shortLink).toBeInTheDocument();
  expect(shortLink.textContent).toBe(props.shortLink);
  expect(shortLink).toHaveAttribute('href', props.shortLink);
});

test('renders a button to copy stats link', () => {
  render(
    <ShortentLink {...props} />,
    { wrapper: BrowserRouter }
  );

  const butttonElements = screen.getAllByRole<HTMLButtonElement>('button');
  const copyStatsLink = butttonElements.find((el) => el.name === 'copy-stats-link');

  if (!copyStatsLink) {
    throw new Error('Element not found');
  }

  expect(copyStatsLink).toBeInTheDocument();
  expect(copyStatsLink).toHaveAttribute('data-test-text', props.statsLink);
});

test('renders a button to copy short link', () => {
  render(
    <ShortentLink {...props} />,
    { wrapper: BrowserRouter }
  );

  const butttonElements = screen.getAllByRole<HTMLButtonElement>('button');
  const copyStatsLink = butttonElements.find((el) => el.name === 'copy-short-link');

  if (!copyStatsLink) {
    throw new Error('Element not found');
  }

  expect(copyStatsLink).toBeInTheDocument();
  expect(copyStatsLink).toHaveAttribute('data-test-text', props.shortLink);
});
