import { useContext } from 'react';
import {
  Box,
  Grid,
  TextField,
  InputLabel,
  Autocomplete,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { FormDetailsContext } from '..';
import { countries } from '@src/countryData/country';

export default function Phone() {
  const { control, userData, errors } = useContext(FormDetailsContext);

  const dialCode = userData?.phone.dialCode;
  const phoneNumber = userData?.phone.phoneNumber;

  return (
    <>
      <Grid item xs={6} sm={6}>
        <InputLabel htmlFor="dial-code-select">Dial Code</InputLabel>
        <Controller
          name="phone.dialCode"
          control={control}
          defaultValue={dialCode}
          render={({ field }) => {
            const { onChange, value, name } = field;
            return (
              <Autocomplete
                fullWidth
                id="dial-code-select"
                name={name}
                value={
                  value
                    ? countries.find((option) => value === option.dialCode) ??
                      null
                    : null
                }
                onChange={(e, newValue) => {
                  onChange(newValue ? newValue.dialCode : null);
                }}
                options={countries}
                autoHighlight
                getOptionLabel={(option) =>
                  `(+${option.dialCode}) ${option.label}`
                }
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      alt=""
                    />
                    +{option.dialCode} {option.label} ({option.code})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'disable',
                    }}
                  />
                )}
              />
            );
          }}
        />
      </Grid>

      <Grid item xs={6} sm={6}>
        <InputLabel
          htmlFor="phone-number"
          error={Boolean(errors.phone?.phoneNumber)}
        >
          Phone Number
        </InputLabel>
        <Controller
          name="phone.phoneNumber"
          control={control}
          defaultValue={phoneNumber}
          render={({ field }) => (
            <TextField
              fullWidth
              id="phone-number"
              name={field.name}
              value={field.value}
              error={Boolean(errors.phone?.phoneNumber)}
              onChange={field.onChange}
              {...field}
            />
          )}
        />

        {errors.phone?.phoneNumber && (
          <Typography variant="body2" color="error" className="error">
            {errors.phone.phoneNumber?.message}
          </Typography>
        )}
      </Grid>
    </>
  );
}
