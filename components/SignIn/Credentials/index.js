import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signinSchema } from '@utils/yup/credentialsSchema';
import { signIn } from 'next-auth/react';
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
import { ErrorBox } from '@components/SignUp/styled';
import ErrorIcon from '@mui/icons-material/Error';

export default function Credentials() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [apiError, setApiError] = useState({
    show: false,
    message: '',
  });

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = async (val) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: val.email,
        password: val.password,
      });

      if (res.ok) {
        setApiError({ show: false });
      }

      throw new Error(`${res.error}`);
    } catch (error) {
      setApiError({ show: true, message: error.message });
    }
  };

  return (
    <>
      {apiError.show && (
        <ErrorBox>
          <Typography variant="body2" color="error">
            <ErrorIcon />
            {apiError.message}
          </Typography>
        </ErrorBox>
      )}

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

      <StyledButton
        disabled={isSubmitting}
        sx={{ py: 1, my: 2 }}
        onClick={handleSubmit(onSubmit)}
      >
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
