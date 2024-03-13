import { useContext, useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Button,
  Box,
  Divider,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { languages } from '@src/country-data/languages';
import { PersonalDetailsContext } from './PersonalDetails';
import { CustomGrid } from '@utils/helper/custom-components/CustomGrid';

export default function Language() {
  const { control, userData, errors, showEdit } =
    useContext(PersonalDetailsContext);

  const language = userData.languageCountry;

  return (
    <>
      {showEdit && (
        <>
          <CustomGrid>
            <Controller
              name="languageCountry"
              control={control}
              defaultValue={language}
              render={({ field }) => {
                const { onChange, value, name } = field;

                return (
                  <Autocomplete
                    id="language-select"
                    noOptionsText="Language Not Found"
                    name={name}
                    value={value}
                    options={languages.map((option) => `${option.language}`)}
                    onChange={(e, newValue) => {
                      onChange(newValue);
                    }}
                    isOptionEqualToValue={(option, value) => {
                      return option.language === value.language;
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Language"
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
        </>
      )}

      {!showEdit && (
        <>
          <Grid item xs={12} sm={6}>
            <Typography>Language</Typography>
            <Typography variant="body2">
              {language ? language : 'Not Provided'}
            </Typography>
          </Grid>
        </>
      )}
    </>
  );
}
