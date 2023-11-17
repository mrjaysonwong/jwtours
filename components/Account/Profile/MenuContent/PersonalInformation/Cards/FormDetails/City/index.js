import { useContext, useState, useEffect } from 'react';
import { Grid, TextField, InputLabel, Autocomplete } from '@mui/material';
import { FormDetailsContext } from '..';
import { useDebounce } from 'use-debounce';
import { getCities } from '@utils/api/client/cities/getCities';
import { useMessageStore } from '@stores/messageStore';

export default function City() {
  const { register, userData } = useContext(FormDetailsContext);

  const city = userData?.city;

  const [text, setText] = useState('');
  const [value] = useDebounce(text, 1000);
  const [suggestions, setSuggestions] = useState([]);

  const { error, handleApiMessage } = useMessageStore();

  const uniqueCities = suggestions.filter(
    (option, index) =>
      suggestions.findIndex(
        (i) => i.name === option.name && i.country === option.country
      ) === index
  );

  const getData = async () => {
    try {
      // return if suggestions value result is empty to avoid error
      if (!value) {
        return;
      }

      const data = await getCities(value);

      setSuggestions(data);
      useMessageStore.setState({ error: { open: false } });
    } catch (error) {
      console.error(error.message);
      handleApiMessage(error.message, 'error');
    }
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <Grid item xs={12} sm={6}>
        <InputLabel htmlFor="city-select" error={error.open}>
          City
        </InputLabel>
        <Autocomplete
          id="city-select"
          noOptionsText={
            error.open
              ? `${error.message}`
              : `Can't find it? Try a larger town or city nearby.`
          }
          value={city}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          options={uniqueCities.map(
            (option) => `${option.name}, ${option.country}`
          )}
          {...register('city')}
          renderInput={(params) => (
            <TextField
              {...params}
              name="city"
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
      </Grid>
    </>
  );
}
