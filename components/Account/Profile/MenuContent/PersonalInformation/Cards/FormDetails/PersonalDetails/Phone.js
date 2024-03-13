import { useContext } from 'react';
import { Box, Grid, TextField, Autocomplete, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { PersonalDetailsContext } from './PersonalDetails';
import { countries } from '@src/country-data/countries';
import { FieldErrorMessage } from '@utils/helper/custom-components/CustomMessages';
import { CustomTextField } from '@utils/helper/custom-components/CustomTextField';
import { CustomGrid } from '@utils/helper/custom-components/CustomGrid';

export default function Phone() {
  const { control, userData, errors, showEdit } = useContext(
    PersonalDetailsContext
  );

  const dialCode = userData.phone.dialCode;
  const phoneNumber = userData.phone.phoneNumber;

  const dialNumber = `(+${dialCode}) ${phoneNumber}`;

  return (
    <>
      {showEdit && (
        <>
          <CustomGrid>
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
                    options={countries}
                    value={
                      value
                        ? countries.find(
                            (option) => value === option.dialCode
                          ) ?? null
                        : null
                    }
                    onChange={(e, newValue) => {
                      onChange(newValue ? newValue.dialCode : null);
                    }}
                    getOptionLabel={(option) =>
                      `(+${option.dialCode}) ${option.code}`
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
                        label="Dial Code"
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
          </CustomGrid>

          <CustomGrid>
            <Controller
              name="phone.phoneNumber"
              control={control}
              defaultValue={phoneNumber}
              render={({ field }) => (
                <CustomTextField
                  field={field}
                  label="Phone Number"
                  name={field.name}
                  value={field.value}
                  error={errors.phone?.phoneNumber}
                />
              )}
            />

            <FieldErrorMessage error={errors.phone?.phoneNumber} />
          </CustomGrid>
        </>
      )}

      {!showEdit && (
        <>
          <Grid item xs={12} sm={6}>
            <Typography>Phone Number</Typography>
            <Typography variant="body2">
              {dialCode && phoneNumber ? dialNumber : 'Not Provided'}
            </Typography>
          </Grid>
        </>
      )}
    </>
  );
}
