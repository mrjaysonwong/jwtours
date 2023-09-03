import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@utils/yup/credentialsSchema';
import {
  Typography,
  TextField,
  Divider,
  InputAdornment,
  IconButton,
  Stack,
} from '@mui/material';
import { StyledButton } from '@components/Layout/Styles/globals';
import { ErrorBox } from '../styled';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorIcon from '@mui/icons-material/Error';
import { createUser } from '@utils/helper/api/client/users';

export default function FormDetails() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [apiError, setApiError] = useState({
    show: false,
    message: '',
  });

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (values) => {
    try {
      const data = await createUser(values);
      if (data) {
        setApiError({ show: false });
      }
    } catch (error) {
      console.error(error.message);

      setApiError({
        show: true,
        message: error.message,
      });
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Create your JWTours account
      </Typography>

      {apiError.show && (
        <ErrorBox>
          <Typography variant="body2" color="error">
            <ErrorIcon />
            {apiError.message}
          </Typography>
        </ErrorBox>
      )}

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Stack direction="column">
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            error={Boolean(errors.firstName)}
            {...register('firstName')}
          />

          {errors.firstName && (
            <Typography variant="body2" color="error" className="error">
              {errors.firstName?.message}
            </Typography>
          )}
        </Stack>

        <Stack direction="column">
          <TextField
            name="lastName"
            label="Last Name"
            variant="outlined"
            error={Boolean(errors.lastName)}
            {...register('lastName')}
          />

          {errors.lastName && (
            <Typography variant="body2" color="error" className="error">
              {errors.lastName?.message}
            </Typography>
          )}
        </Stack>
      </Stack>

      <Stack spacing={2}>
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
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          error={Boolean(errors.password)}
          {...register('password')}
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

        {errors.password && (
          <Typography variant="body2" color="error" className="error">
            {errors.password?.message}
          </Typography>
        )}

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type={showConfirmPassword ? 'text' : 'password'}
          error={Boolean(errors.confirmPassword)}
          {...register('confirmPassword')}
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

        {errors.confirmPassword && (
          <Typography variant="body2" color="error" className="error">
            {errors.confirmPassword?.message}
          </Typography>
        )}
      </Stack>
      <StyledButton
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        sx={{ py: 1, my: 2 }}
      >
        Sign Up
      </StyledButton>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="body2">
        By clicking “Sign up”, you agree to our{' '}
        <Link href="/legal/user-agreement">
          <a>terms of use </a>
        </Link>{' '}
        and acknowledge that you have read and understand our{' '}
        <Link href="/legal/privacy-policy">
          <a>privacy policy</a>
        </Link>
        .
      </Typography>
    </>
  );
}
