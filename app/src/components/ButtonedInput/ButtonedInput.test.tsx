import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ButtonedInput, { IButtonedInputProps } from './ButtonedInput';

test('renders an input element with a button', () => {
  const props: IButtonedInputProps = {
    buttonTitle: 'I am a button',
  }

  render(
    <ButtonedInput {...props} />
  );

  const buttonElement = screen.getByRole('button');
  const inputElement = screen.getByRole('textbox');

  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveTextContent(props.buttonTitle);
  expect(inputElement).toBeInTheDocument();
});

test('recieves input value on button click', () => {
  const props: IButtonedInputProps = {
    buttonTitle: 'I am a button',
  }

  const typedText = 'type sume text';

  let inputValue;
  const handleOnClick = jest.fn((inputVal: string) => {
    inputValue = inputVal;
  });

  render(
    <ButtonedInput {...props} onClick={handleOnClick} />
  );

  const buttonElement = screen.getByRole('button');
  const inputElement = screen.getByRole('textbox');

  inputElement.focus();
  userEvent.keyboard(typedText);
  userEvent.click(buttonElement);

  expect(handleOnClick).toBeCalledTimes(1);
  expect(inputValue).toBe(typedText);
});

test('input has label when `label` is provided', () => {
  const props = {
    buttonTitle: 'I am a button',
    label: 'Some label',
  }

  render(
    <ButtonedInput {...props} />
  );

  const inputElement = screen.getByLabelText(props.label);

  expect(inputElement).toBeInTheDocument();
});

test('input has placeholder when `placeholder` is provided', () => {
  const props = {
    buttonTitle: 'I am a button',
    placeholder: 'Some placeholder',
  }

  render(
    <ButtonedInput {...props} />
  );

  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveAttribute('placeholder', props.placeholder);
});

test('input has default value when `defaultValue` is provided', () => {
  const props = {
    buttonTitle: 'I am a button',
    defaultValue: 'Some value',
  }

  render(
    <ButtonedInput {...props} />
  );

  const inputElement = screen.getByRole<HTMLInputElement>('textbox');

  expect(inputElement.value).toBe(props.defaultValue);
});

test('input has an error state when validation failed', () => {
  const props = {
    buttonTitle: 'I am a button',
    defaultValue: 'Some value',
    label: 'label',
    validate: jest.fn(() => ({ isValid: false })),
    onClick: () => {},
  }

  render(
    <ButtonedInput {...props} />
  );

  const buttonElement = screen.getByRole('button');
  userEvent.click(buttonElement);

  const container = screen.getByLabelText<HTMLFieldSetElement>('label');
  // eslint-disable-next-line testing-library/no-node-access
  const inputWrapper = container.firstElementChild;

  expect(props.validate).toBeCalled();
  expect(inputWrapper).toHaveClass('Mui-error');
});
