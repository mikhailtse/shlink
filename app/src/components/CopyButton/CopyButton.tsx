import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export interface ICopyButtonProps {
  /**
   * Text to copy to the clipboard.
   */
  text: string;
  /**
   * Name of the button.
   */
  name?: string;
}

/**
 * Renders a button that copies a provided `text` prop to the clipboard.
 */
function CopyButton(props: ICopyButtonProps) {
  const {
    text,
    name,
  } = props;

  const [openTooltip, setOpenTooltip] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (openTooltip) {
      timeout = setTimeout(() => {
        setOpenTooltip(false);
      }, 700);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [openTooltip]);

  const handleOnClick = () => {
    navigator.clipboard.writeText(text);
    setOpenTooltip(true);
  }

  return (
    <Tooltip
      open={openTooltip}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      disableInteractive
      title="Copied!"
      placement="top"
    >
      <Button
        variant='outlined'
        onClick={handleOnClick}
        name={name}
        data-test-text={text}
      >
        Copy
      </Button>
    </Tooltip>
  );
}

export default CopyButton;
