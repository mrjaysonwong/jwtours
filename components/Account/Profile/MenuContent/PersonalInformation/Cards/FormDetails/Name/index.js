import { useContext } from 'react';
import { Grid, TextField, Typography, InputLabel } from '@mui/material';
import { Controller } from 'react-hook-form';
import { FormDetailsContext } from '..';

export default function Name() {
  const { control, userData, errors } = useContext(FormDetailsContext);

  return (
    <>
      <Grid item xs={6} sm={6}>
        <InputLabel htmlFor="first-name" error={Boolean(errors.firstName)}>
          First Name
        </InputLabel>
        <Controller
          name="firstName"
          control={control}
          defaultValue={userData.firstName}
          render={({ field }) => (
            <TextField
              fullWidth
              id="first-name"
              name={field.name}
              value={field.value}
              error={Boolean(errors.firstName)}
              autoComplete="on"
              {...field}
            />
          )}
        />

        {errors.firstName && (
          <Typography variant="body2" color="error" className="error">
            {errors.firstName?.message}
          </Typography>
        )}
      </Grid>

      <Grid item xs={6} sm={6}>
        <InputLabel htmlFor="last-name" error={Boolean(errors.lastName)}>
          Last Name
        </InputLabel>
        <Controller
          name="lastName"
          control={control}
          defaultValue={userData.lastName}
          render={({ field }) => (
            <TextField
              fullWidth
              id="last-name"
              name={field.name}
              value={field.value}
              error={Boolean(errors.lastName)}
              autoComplete="on"
              {...field}
            />
          )}
        />

        {errors.lastName && (
          <Typography variant="body2" color="error" className="error">
            {errors.lastName?.message}
          </Typography>
        )}
      </Grid>
    </>
  );
}
