import { render, screen } from '@testing-library/react';

import CopyButton from './CopyButton';

const props = {
  text: 'text to copy',
};

test('renders a button element', () => {
  render(
    <CopyButton {...props} />
  );

  const buttonElement = screen.getByRole('button');

  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveAttribute('data-test-text', props.text);
});

// TODO: Add test for copy to check data in the clipboard.
// Currently clipboard is not available in testing environment.
// The work with clipboard will be added in the 14.0.0 version
// (currently in beta and not part of CRA)
