import { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import { PersonalDetailsContext } from './PersonalDetails';
import dayjs from 'dayjs';
import { CustomGrid } from '@utils/helper/custom-components/CustomGrid';

export default function DateOfBirth() {
  const { control, userData, showEdit } = useContext(PersonalDetailsContext);
  const dateObject = userData.dateOfBirth;

  const DOB = userData.dateOfBirth
    ? new Date(userData.dateOfBirth).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Not Provided';

  return (
    <>
      {showEdit && (
        <CustomGrid>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue={dateObject ? dayjs(dateObject) : null}
              render={({ field }) => {
                return (
                  <DatePicker
                    {...field}
                    name={field.name}
                    label="Date of Birth"
                    disableFuture
                    onChange={field.onChange}
                    value={field.value}
                    sx={{ width: '100%' }}
                  />
                );
              }}
            />
          </LocalizationProvider>
        </CustomGrid>
      )}

      {!showEdit && (
        <>
          <Grid item xs={6} sm={6}>
            <Typography>Date of Birth</Typography>
            <Typography variant="body2">{DOB}</Typography>
          </Grid>
        </>
      )}
    </>
  );
}
