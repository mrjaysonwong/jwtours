import { useContext } from 'react';
import { Grid, InputLabel, Select as MUISelect, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';
import { FormDetailsContext } from '..';

export default function Gender() {
  const { control, userData } = useContext(FormDetailsContext);

  return (
    <>
      <Grid item xs={6} sm={6}>
        <InputLabel id="select-gender">Gender</InputLabel>
        <Controller
          name="gender"
          control={control}
          defaultValue={userData.gender}
          render={({ field }) => (
            <MUISelect
              fullWidth
              labelId="select-gender"
              id="gender"
              name={field.name}
              value={field.value}
              {...field}
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
              <MenuItem value={'other'}>Other</MenuItem>
            </MUISelect>
          )}
        />
      </Grid>
    </>
  );
}
