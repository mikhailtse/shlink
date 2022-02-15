import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import CopyableLink, { ICopyableLinkProps } from './CopyableLink';

test('renders a button element with "data-test-text" attribute', () => {
  const props: ICopyableLinkProps = {
    linkProps: {
      title: 'some title',
      to: 'redirectTo',
    },
    title: 'Label title',
  };

  render(
    <CopyableLink {...props} />
  );

  const buttonElement = screen.getByRole('button');

  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveAttribute('data-test-text');
});

test('button element has "data-test-text" = `linkProps.to` when `text` is not provided', () => {
  const props: ICopyableLinkProps = {
    linkProps: {
      title: 'some title',
      to: 'redirectTo',
    },
    title: 'Label title',
  };

  render(
    <CopyableLink {...props} />
  );

  const buttonElement = screen.getByRole('button');

  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveAttribute('data-test-text', props.linkProps.to);
});

test('button element has "data-test-text" = `text` when `text` is provided', () => {
  const props: ICopyableLinkProps = {
    linkProps: {
      title: 'some title',
      to: 'redirectTo',
    },
    title: 'Label title',
    text: 'text to copy',
  };

  render(
    <CopyableLink {...props} />
  );

  const buttonElement = screen.getByRole('button');

  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveAttribute('data-test-text', props.text);
});

test('renders a title element', () => {
  const props: ICopyableLinkProps = {
    linkProps: {
      title: 'some title',
      to: 'redirectTo',
    },
    title: 'Label title',
  };

  render(
    <CopyableLink {...props} />
  );

  const titleElement = screen.getByText(props.title);

  expect(titleElement).toBeInTheDocument();
});

test('renders a link element to the outer page when `linkProps.type` is not provided', () => {
  const props: ICopyableLinkProps = {
    linkProps: {
      title: 'some title',
      to: 'redirectTo',
    },
    title: 'Label title',
  };

  render(
    <CopyableLink {...props} />
  );

  const linkElement = screen.getByRole('link');

  expect(linkElement).toBeInTheDocument();
  expect(linkElement.textContent).toBe(props.linkProps.title);
  expect(linkElement).toHaveAttribute('target', '_blank');
  expect(linkElement).toHaveAttribute('rel', 'noopener');
  expect(linkElement).toHaveAttribute('href', props.linkProps.to);
});

test('renders a link element to the outer page when `linkProps.type` = "outer"', () => {
  const props: ICopyableLinkProps = {
    linkProps: {
      title: 'some title',
      to: 'redirectTo',
      type: 'outer',
    },
    title: 'Label title',
  };

  render(
    <CopyableLink {...props} />
  );

  const linkElement = screen.getByRole('link');

  expect(linkElement).toBeInTheDocument();
  expect(linkElement.textContent).toBe(props.linkProps.title);
  expect(linkElement).toHaveAttribute('target', '_blank');
  expect(linkElement).toHaveAttribute('rel', 'noopener');
  expect(linkElement).toHaveAttribute('href', props.linkProps.to);
});

test('renders a link element to the inner page when `linkProps.type` = "inner"', () => {
  const props: ICopyableLinkProps = {
    linkProps: {
      title: 'some title',
      to: 'redirectTo',
      type: 'inner',
    },
    title: 'Label title',
  };

  render(
    <CopyableLink {...props} />,
    { wrapper: BrowserRouter }
  );

  const linkElement = screen.getByRole('link');

  expect(linkElement).toBeInTheDocument();
  expect(linkElement.textContent).toBe(props.linkProps.title);
  expect(linkElement).not.toHaveAttribute('target', '_blank');
  expect(linkElement).not.toHaveAttribute('rel', 'noopener');
  expect(linkElement).toHaveAttribute('href', `/${props.linkProps.to}`);
});
