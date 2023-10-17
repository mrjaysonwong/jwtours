import { useContext } from 'react';
import {
  CardContent,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import { SettingsContext } from '@src/theme/MuiThemeProvider';

export default function CardOne() {
  const { mode, handleChangeTheme } = useContext(SettingsContext);

  return (
    <Box>
      <CardContent>
        <Typography>Layout</Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <FormControl>
          <FormLabel>Theme</FormLabel>
          <RadioGroup
            row
            aria-labelledby="row-radio-buttons-group-label-theme"
            name="row-radio-buttons-group"
            value={mode}
            onChange={handleChangeTheme}
          >
            <FormControlLabel
              value="light"
              control={<Radio />}
              label="Light"
              aria-label="light mode"
            />
            <FormControlLabel
              value="dark"
              control={<Radio />}
              label="Dark"
              aria-label="dark mode"
            />
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Box>
  );
}
