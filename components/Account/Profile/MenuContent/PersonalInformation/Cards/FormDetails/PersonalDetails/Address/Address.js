import { useContext, useEffect, useState } from 'react';
import { Grid, TextField, Autocomplete, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { PersonalDetailsContext } from '../PersonalDetails';
import { useDebounce } from 'use-debounce';
import axios from 'axios';
import { useMessageStore } from '@stores/messageStore';
import { CustomTextField } from '@utils/helper/custom-components/CustomTextField';
import { CustomGrid } from '@utils/helper/custom-components/CustomGrid';

export default function Address() {
  const { control, userData, showEdit } = useContext(PersonalDetailsContext);

  const address = userData.address;

  const street = address.street;
  const homeTown = address.homeTown;
  const postalCode = address.postalCode;

  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedValue] = useDebounce(text, 1500);

  const { error, handleApiMessage } = useMessageStore();

  const getData = async () => {
    try {
      // return if suggestions value result is empty to avoid error
      if (!debouncedValue) {
        return;
      }

      const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/places`;

      const options = {
        method: 'GET',
        params: {
          namePrefix: `${debouncedValue}`,
          limit: 10,
          sort: '-population',
        },
        mode: 'cors',
        headers: {
          // NEXT_PUBLIC_ expose to the browser
          'X-RapidAPI-Key': '0d39bcbeb2msh230f01154c67b95p1f9b54jsn1d5971d293e1',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
      };

      const { data } = await axios.get(url, options);

      const result = data.data;

      setSuggestions(result);

      useMessageStore.setState({ error: { open: false } });
    } catch (error) {
      console.error(error);
      handleApiMessage('An error occurred. Please try again.', 'error');
    }
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

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
