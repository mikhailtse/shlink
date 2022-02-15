import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import Link, { ILinkProps } from './Link';

test('renders a link element with a title when type="outer"', () => {
  const props: ILinkProps = {
    title: 'test title',
    to: 'https://github.com/mikhailtse/shlink',
    type: 'outer',
  };

  render(
    <Link {...props} />,
  );

  const linkElement = screen.getByRole('link');

  expect(linkElement).toBeInTheDocument();
  expect(linkElement.textContent).toBe(props.title);
  expect(linkElement).toHaveAttribute('target', '_blank');
  expect(linkElement).toHaveAttribute('rel', 'noopener');
  expect(linkElement).toHaveAttribute('href', props.to);
});

test('renders a link element with a title when type="inner"', () => {
  const props: ILinkProps = {
    title: 'test title',
    to: 'stats',
    type: 'inner',
  };

  render(
    <Link {...props} />,
    { wrapper: BrowserRouter }
  );

  const linkElement = screen.getByRole('link');

  expect(linkElement).toBeInTheDocument();
  expect(linkElement.textContent).toBe(props.title);
  expect(linkElement).not.toHaveAttribute('target', '_blank');
  expect(linkElement).not.toHaveAttribute('rel', 'noopener');
  expect(linkElement).toHaveAttribute('href', `/${props.to}`);
});

test('renders a link element with type="outer" by default', () => {
  const props: ILinkProps = {
    title: 'test title',
    to: 'https://github.com/mikhailtse/shlink',
  };

  render(
    <Link {...props} />,
  );

  const linkElement = screen.getByRole('link');

  expect(linkElement).toBeInTheDocument();
  expect(linkElement.textContent).toBe(props.title);
  expect(linkElement).toHaveAttribute('target', '_blank');
  expect(linkElement).toHaveAttribute('rel', 'noopener');
  expect(linkElement).toHaveAttribute('href', props.to);
});

test('has `data-test-type` = "outer" when `type` = "outer"', () => {
  const props: ILinkProps = {
    title: 'test title',
    to: 'https://github.com/mikhailtse/shlink',
    type: 'outer',
  };

  render(
    <Link {...props} />
  );

  const linkElement = screen.getByRole('link');

  expect(linkElement).toHaveAttribute('data-test-type', 'outer');
});

test('has `data-test-type` = "inner" when `type` = "inner"', () => {
  const props: ILinkProps = {
    title: 'test title',
    to: 'https://github.com/mikhailtse/shlink',
    type: 'inner',
  };

  render(
    <Link {...props} />,
    { wrapper: BrowserRouter }
  );

  const linkElement = screen.getByRole('link');

  expect(linkElement).toHaveAttribute('data-test-type', 'inner');
});
