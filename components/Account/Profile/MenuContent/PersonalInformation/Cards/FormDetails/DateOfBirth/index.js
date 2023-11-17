import { useContext } from 'react';
import { Grid, InputLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import { FormDetailsContext } from '..';
import dayjs from 'dayjs';

export default function DateOfBirth() {
  const { control, userData } = useContext(FormDetailsContext);
  const dateObject = userData?.dateOfBirth;

  return (
    <>
      <Grid item xs={6} sm={6}>
        <InputLabel id="date-of-birth-picker">Date of Birth</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="dateOfBirth"
            id="date-of-birth-picker"
            control={control}
            defaultValue={dateObject ? dayjs(dateObject) : null}
            render={({ field }) => {
              const { onChange, value, name } = field;
              return (
                <DatePicker
                  id="date-of-birth-picker"
                  name={name}
                  disableFuture
                  onChange={onChange}
                  value={value}
                  sx={{ width: '100%' }}
                  {...field}
                />
              );
            }}
          />
        </LocalizationProvider>
      </Grid>
    </>
  );
}
