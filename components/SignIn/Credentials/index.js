import { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Typography,
  TextField,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { StyledButton } from '@components/Layout/Styles/globals';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Credentials() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
      <TextField label="Email" variant="outlined" />
      <TextField
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
        sx={{ mt: 2 }}
      />
      <StyledButton sx={{ py: 1, my: 2 }}>
        Sign in
      </StyledButton>
      <Divider />
      <Typography variant="body2" sx={{ textAlign: 'right', my: 1 }}>
        <Link href="/">
          <a>Forgot password?</a>
        </Link>
      </Typography>
    </>
  );
}
