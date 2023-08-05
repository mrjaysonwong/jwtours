import { useState } from 'react';
import { signIn } from 'next-auth/react';
import {
  Button,
  Typography,
  TextField,
  Divider,
  InputAdornment,
  IconButton,
  Stack,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function FormDetails() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <TextField label="First Name" variant="outlined" />
        <TextField label="Last Name" variant="outlined" />
      </Stack>
      <Stack spacing={2}>
        <TextField label="Email" variant="outlined" />
        <TextField
          variant="outlined"
          id="password"
          className="password"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          id="confirmPassword"
          className="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowConfirmPassword}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Button variant="contained" sx={{ my: 2 }}>
        Sign Up
      </Button>
      <Divider />
      <Typography variant="body2" sx={{ textAlign: 'right', my: 1 }}>
        Already have an account? <a onClick={() => signIn()}>Sign In</a>
      </Typography>
    </>
  );
}