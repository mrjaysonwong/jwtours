import { useContext } from 'react';
import {
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { PersonalDetailsContext } from '../PersonalDetails';
import { CustomGrid } from '@utils/helper/custom-components/CustomGrid';

export default function Gender() {
  const { control, userData, showEdit } = useContext(PersonalDetailsContext);

  return (
    <>
      {showEdit && (
        <CustomGrid>
          <FormControl fullWidth>
            <InputLabel id="gender-select">Gender</InputLabel>

            <Controller
              name="gender"
              control={control}
              defaultValue={userData.gender}
              render={({ field }) => (
                <Select
                  fullWidth
                  labelId="gender-select"
                  label="Gender"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                  <MenuItem value={'other'}>Other</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </CustomGrid>
      )}

      {!showEdit && (
        <>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Gender</Typography>
            <Typography
              variant="body2"
              sx={{
                ':first-letter': {
                  textTransform: 'uppercase',
                },
              }}
            >
              {userData.gender ? userData.gender : 'Not Provided'}
            </Typography>
          </Grid>
        </>
      )}
    </>
  );
}
