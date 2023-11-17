import { useContext } from 'react';
import { Grid, TextField, InputLabel } from '@mui/material';
import { Controller } from 'react-hook-form';
import { FormDetailsContext } from '..';

export default function Address() {
  const { control, userData, errors } = useContext(FormDetailsContext);

  const address = userData?.address;

  return (
    <>
      <Grid item xs={12} sm={6}>
        <InputLabel htmlFor="address-input">Address</InputLabel>
        <Controller
          name="address"
          control={control}
          defaultValue={address}
          render={({ field }) => (
            <TextField
              fullWidth
              id="address-input"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              inputProps={{ maxLength: 100 }}
              autoComplete="on"
              {...field}
            />
          )}
        />
      </Grid>
    </>
  );
}
