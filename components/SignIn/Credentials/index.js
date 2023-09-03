import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signinSchema } from '@utils/yup/credentialsSchema';
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        error={Boolean(errors.email)}
        {...register('email')}
      />

      {errors.email && (
        <Typography variant="body2" color="error" className="error">
          {errors.email?.message}
        </Typography>
      )}

      <TextField
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
        error={Boolean(errors.password)}
        {...register('password')}
        sx={{ mt: 2 }}
      />

      {errors.password && (
        <Typography variant="body2" color="error" className="error">
          {errors.password?.message}
        </Typography>
      )}

      <StyledButton sx={{ py: 1, my: 2 }} onClick={handleSubmit(onSubmit)}>
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
