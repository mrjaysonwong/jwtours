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
import { AlertMessage } from '@utils/helper/custom-components/CustomMessages';
import { FieldErrorMessage } from '@utils/helper/custom-components/CustomMessages';

export default function Credentials() {
  const { alert, handleAlertMessage, handleOnClose } = useMessageStore();
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
    const res = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (!res.ok) {
      handleAlertMessage(res.error, 'error');
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

      <TextField
        {...register('email')}
        fullWidth
        name="email"
        id="email"
        label="Email"
        error={!!errors.email}
        autoComplete="on"
      />

      <FieldErrorMessage error={errors.email} />

      <TextField
        fullWidth
        name="password"
        id="password"
        label="Password"
        error={!!errors.password}
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
