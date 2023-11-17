import { useContext } from 'react';
import { Grid, TextField, Typography, InputLabel } from '@mui/material';
import { FormDetailsContext } from '..';

export default function Email() {
  const { userData, errors } = useContext(FormDetailsContext);

  return (
    <>
      <Grid item xs={12} sm={12}>
        <InputLabel htmlFor="email" error={Boolean(errors.email)}>
          Email
        </InputLabel>
        <TextField
          fullWidth
          id="email"
          name="email"
          defaultValue={userData.email}
          autoComplete="on"
        />
      </Grid>
    </>
  );
}
