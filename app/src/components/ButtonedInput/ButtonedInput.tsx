import React, { useRef, useState } from 'react';

import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

export interface IButtonedInputValidation {
  isValid: boolean;
  message?: string;
}

export interface IButtonedInputProps {
  /**
   * Title of the button element.
   */
  buttonTitle: string;
  /**
   * Default value for the input element.
   */
  defaultValue?: string;
  /**
   * Placeholder for the input element.
   */
  placeholder?: string;
  /**
   * A value for the `aria-label` attribute of the input element.
   */
  label?: string;
  /**
   * Callback fires when the button element has been clicked clicked.
   */
  onClick?: (inputValue: string) => void;
  /**
   * Validation function fired on button click.
   * If validation is not passed, `onClick` will bot be called.
   */
  validate?: (inputValue: string) => IButtonedInputValidation;
}

/**
 * Renders an input with a button.
 */
function ButtonedInput(props: IButtonedInputProps) {
  const {
    buttonTitle,
    defaultValue,
    label,
    placeholder,
    onClick,
    validate,
  } = props;

  const [validation, setValidation] = useState<IButtonedInputValidation>()

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnClick = onClick && (() => {
    const inputValue = inputRef.current?.value;
    
    if (inputValue !== undefined) {
      const validationResult = validate?.(inputValue);
      if (validationResult !== undefined) {
        setValidation(validationResult);
      }
      if (validationResult === undefined || validationResult.isValid) {
        onClick(inputValue);
      }
    }
  });

  const handleOnChange = validate && ((event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;

    if (validation) {
      const validationResult = validate(inputValue);
      setValidation(validationResult);
    }
  });

  const handleOnBlur = validate && (() => {
    if (validation?.isValid === true) {
      setValidation(undefined);
    }
  })

  return (
    <TextField
      defaultValue={defaultValue}
      sx={{ mt: { xs: 10, md: 15 }, mb: { xs: 5, md: 10 } }}
      fullWidth
      inputRef={inputRef}
      placeholder={placeholder}
      aria-label={label}
      error={!!validation && !validation.isValid}
      variant="outlined"
      helperText={validation?.message}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button variant="contained" onClick={handleOnClick}>
              {buttonTitle}
            </Button>
          </InputAdornment>
        )
      }}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
    />
  );
}

export default ButtonedInput;
