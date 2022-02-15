import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SxProps } from '@mui/material';

type PeriodValue = '1' | '3' | '6' | '12' | '0';

export interface IPeriodSelectProps {
  /**
   * Value of the select.
   * 
   * 0 - for the "All the time" item.
   */
  value: PeriodValue;
  /**
   * Callback fires when select value has been changed.
   */
  onChange?: (value: PeriodValue) => void;
}

const sxProp: SxProps = {
  mt: { xs: 10, md: 15 },
  mb: { xs: 5, md: 10 },
};

function PeriodSelect(props: IPeriodSelectProps) {
  const {
    value,
    onChange,
  } = props;

  const handleOnChange = onChange && ((event: SelectChangeEvent<PeriodValue>) => {
    onChange(event.target.value as PeriodValue);
  })

  return (
    <FormControl fullWidth sx={sxProp}>
      <InputLabel id="period-select-label">Period</InputLabel>
      <Select
        labelId="period-select-label"
        id="period-select"
        value={value}
        label="Period"
        onChange={handleOnChange}
      >
        <MenuItem value="1">1 month</MenuItem>
        <MenuItem value="3">3 months</MenuItem>
        <MenuItem value="6">6 months</MenuItem>
        <MenuItem value="12">1 year</MenuItem>
        <MenuItem value="0">All the time</MenuItem>
      </Select>
    </FormControl>
  );
}

export default PeriodSelect;
