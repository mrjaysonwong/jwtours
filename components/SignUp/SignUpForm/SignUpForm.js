import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@utils/yup/credentialsSchema';
import {
  Box,
  Typography,
  TextField,
  Divider,
  InputAdornment,
  IconButton,
  Stack,
} from '@mui/material';
import { StyledButton } from '@components/Layout/Styles/globals';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InfoIcon from '@mui/icons-material/Info';
import CircularIndeterminate from '@components/Layout/Loaders/CircularProgress';
import axios from 'axios';
import { errorHandler } from '@utils/helper/functions/errorHandler';
import { useMessageStore } from '@stores/messageStore';
import {
  AlertMessage,
  ErrorMessage,
} from '@utils/helper/custom-components/CustomMessages';
import UseOfEmail from '@components/SignUp/Dialog/UseOfEmail';
import { FieldErrorMessage } from '@utils/helper/custom-components/CustomMessages';

export default function SignUpForm() {
  const { error, alert, handleApiMessage, handleAlertMessage } =
    useMessageStore();
  const [hasError, setHasError] = useState(false);

  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (values) => {
    try {
      const url = `/api/auth/signup`;
      const { data } = await axios.post(url, values);

      handleAlertMessage(data.message, 'success');
      reset();
      setHasError(false);

      const timeout = setTimeout(() => {
        window.location.href = '/auth/signin';
      }, 3000);

      return () => clearTimeout(timeout);
    } catch (error) {
      console.error('error', error);

      const { message } = errorHandler(error);

      setHasError(true);
      handleApiMessage(message, 'error');
    }
  };

  return (
    <>
      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
      />
      {hasError && error.open && <ErrorMessage message={error.message} />}

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Stack direction="column">
          <TextField
            name="firstName"
            label="First Name"
            error={Boolean(errors.firstName)}
            {...register('firstName')}
          />

          <FieldErrorMessage error={errors.firstName} />
        </Stack>

        <Stack direction="column">
          <TextField
            name="lastName"
            label="Last Name"
            error={Boolean(errors.lastName)}
            {...register('lastName')}
          />

          <FieldErrorMessage error={errors.lastName} />
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <TextField
          name="email"
          label="Email"
          error={Boolean(errors.email)}
          autoComplete="on"
          {...register('email')}
        />

        <FieldErrorMessage error={errors.email} />

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

        <FieldErrorMessage error={errors.password} />

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

        <FieldErrorMessage error={errors.confirmPassword} />
      </Stack>

      <StyledButton
        type="submit"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        sx={{ py: 1, my: 2 }}
      >
        {isSubmitting ? <CircularIndeterminate /> : 'Sign Up'}
      </StyledButton>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: 'flex' }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Use of Email Guidelines, Click this info icon
        </Typography>

        <InfoIcon onClick={() => setOpen(true)} />
      </Box>

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

      <UseOfEmail open={open} setOpen={setOpen} />
    </>
  );
}
