import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signinSchema } from '@utils/yup/credentialsSchema';
import { signIn } from 'next-auth/react';
import {
  Typography,
  TextField,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { StyledButton } from '@components/Layout/Styles/globals';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularIndeterminate from '@components/Layout/Loaders/CircularProgress';
import { useMessageStore } from '@stores/messageStore';
import { ErrorMessage } from '@utils/helper/custom-components/CustomMessages';
import { FieldErrorMessage } from '@utils/helper/custom-components/CustomMessages';

export default function Credentials() {
  const { error, handleApiMessage } = useMessageStore();
  const [hasError, setHasError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const onSubmit = async (values) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      // signIn callback error response
      if (!res.ok) {
        throw new Error(res.error);
      }
    } catch (error) {
      setHasError(true);
      handleApiMessage(error.message, 'error');
    }
  };

  return (
    <>
      {hasError && error.open && <ErrorMessage message={error.message} />}

      <TextField
        name="email"
        id="email"
        label="Email"
        error={Boolean(errors.email)}
        autoComplete="on"
        {...register('email')}
      />

      <FieldErrorMessage error={errors.email} />

      <TextField
        name="password"
        id="password"
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

      <FieldErrorMessage error={errors.password} />

      <StyledButton
        type="submit"
        disabled={isSubmitting}
        sx={{ py: 1, my: 2 }}
        onClick={handleSubmit(onSubmit)}
      >
        {isSubmitting ? <CircularIndeterminate /> : 'Sign In'}
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
