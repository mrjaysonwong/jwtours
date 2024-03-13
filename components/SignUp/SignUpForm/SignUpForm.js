import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import { AlertMessage } from '@utils/helper/custom-components/CustomMessages';
import UseOfEmail from '@components/SignUp/UseOfEmail/UseOfEmail';
import { FieldErrorMessage } from '@utils/helper/custom-components/CustomMessages';

export default function SignUpForm() {
  const router = useRouter();

  const { alert, handleAlertMessage, handleOnClose } = useMessageStore();

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
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (values) => {
    try {
      const url = `/api/auth/users/signup`;
      await axios.post(url, values);

      reset();

      router.replace(
        {
          pathname: '/auth/signup/confirmation',
          query: { email: values.email },
        },
        '/auth/signup/confirmation'
      );
    } catch (error) {
      const { errorMessage } = errorHandler(error);

      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleOnClose}
      />

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Stack direction="column">
          <TextField
            {...register('firstName')}
            name="firstName"
            label="First Name"
            error={!!errors.firstName}
          />

          <FieldErrorMessage error={errors.firstName} />
        </Stack>

        <Stack direction="column">
          <TextField
            {...register('lastName')}
            name="lastName"
            label="Last Name"
            error={!!errors.lastName}
          />

          <FieldErrorMessage error={errors.lastName} />
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <TextField
          {...register('email')}
          name="email"
          label="Email"
          error={!!errors.email}
          autoComplete="on"
          helperText={isDirty && 'Email must use only : a-z 0-9 . _ -'}
        />

        <FieldErrorMessage error={errors.email} />

        <TextField
          {...register('password')}
          name="password"
          label="Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          error={!!errors.password}
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
          {...register('confirmPassword')}
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type={showConfirmPassword ? 'text' : 'password'}
          error={!!errors.confirmPassword}
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

      <Box sx={{ textAlign: 'center', py: 1 }}>
        <Typography>Use of Email Guidelines</Typography>
        <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
          Click this info icon{' '}
          <InfoIcon onClick={() => setOpen(true)} sx={{ ml: 1 }} />
        </Typography>
      </Box>

      <Typography sx={{ mt: 2 }}>
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
