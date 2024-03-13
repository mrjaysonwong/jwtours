import { useContext, useEffect, useState } from 'react';
import { Grid, TextField, Autocomplete, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { PersonalDetailsContext } from './PersonalDetails';
import { useDebounce } from 'use-debounce';
import axios from 'axios';
import { useMessageStore } from '@stores/messageStore';
import { CustomTextField } from '@utils/helper/custom-components/CustomTextField';
import { CustomGrid } from '@utils/helper/custom-components/CustomGrid';
import { errorHandler } from '@utils/helper/functions/errorHandler';

export default function Address() {
  const { control, userData, showEdit } = useContext(PersonalDetailsContext);

  const address = userData.address;

  const street = address.street;
  const homeTown = address.homeTown;
  const postalCode = address.postalCode;

  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedValue] = useDebounce(text, 1500);

  const { error, handleMessage } = useMessageStore();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleErrorMessage = (error) => {
    const { isClientError, isServerError, statusText, errorMessage } =
      errorHandler(error);

    if (isClientError || isServerError) {
      handleMessage(errorMessage ?? statusText, 'error');
    }
  };

  const getData = async () => {
    try {
      // return if suggestions value result is empty to avoid error
      if (!debouncedValue) {
        return;
      }

      const url = '/api/places';

      const options = {
        method: 'GET',
        params: {
          namePrefix: `${debouncedValue}`,
        },
      };

      const { data } = await axios.get(url, options);

      const result = data;

      setSuggestions(result);
      useMessageStore.setState({ error: { open: false } });
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <>
      {showEdit && (
        <>
          <Grid item xs={12} sm={12}>
            <Controller
              name="address.street"
              control={control}
              defaultValue={street}
              render={({ field }) => (
                <CustomTextField
                  field={field}
                  id="street-input"
                  label="Street"
                  name={field.name}
                  value={field.value}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="address.homeTown"
              control={control}
              defaultValue={homeTown}
              render={({ field }) => {
                const { onChange, value, name } = field;

                return (
                  <Autocomplete
                    id="city-select"
                    noOptionsText={
                      error.open
                        ? `${error.message}`
                        : `Can't find it? Try a larger town or city nearby.`
                    }
                    value={value}
                    options={suggestions.map(
                      (option, idx) =>
                        `${idx + 1}.) ${option.name}, ${option.region}, ${
                          option.country
                        }`
                    )}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        const modifiedValue = newValue.replace(
                          /^\d+\.\)\s/,
                          ''
                        );

                        if (modifiedValue) {
                          onChange(modifiedValue);
                        }
                      }
                    }}
                    isOptionEqualToValue={(option, value) => {
                      return option.name === value.name;
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name={name}
                        label="Location"
                        value={text}
                        error={error.open}
                        onChange={handleChange}
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

          <CustomGrid>
            <Controller
              name="address.postalCode"
              control={control}
              defaultValue={postalCode}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="postalCode-input"
                  label="Postal Code"
                  name={field.name}
                  value={field.value}
                  inputProps={{ maxLength: 10 }}
                />
              )}
            />
          </CustomGrid>
        </>
      )}

      {!showEdit && (
        <>
          <Grid item xs={12} sm={6}>
            <Typography>Address</Typography>
            <Typography variant="body2">
              {address
                ? [street, homeTown, postalCode].filter(Boolean).join(', ') ||
                  'Not Provided'
                : 'Not Provided'}
            </Typography>
          </Grid>
        </>
      )}
    </>
  );
}
