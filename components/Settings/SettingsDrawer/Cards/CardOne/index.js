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
        <Typography variant="h6">Layout</Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <FormControl>
          <FormLabel>Theme</FormLabel>
          <RadioGroup
            row
            aria-labelledby="theme-radio-buttons-label"
            name="theme-radio-buttons"
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
