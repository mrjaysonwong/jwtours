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
import { ErrorBox } from '@components/SignUp/styled';
import ErrorIcon from '@mui/icons-material/Error';
import CircularIndeterminate from '@components/Layout/Loaders/CircularProgress';
import { useMessageStore } from '@stores/messageStore';

export default function Credentials() {
  const { error, handleApiMessage } = useMessageStore();
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

  const onSubmit = async (val) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: val.email,
        password: val.password,
      });

      if (!res.ok) {
        throw new Error(res.error);
      }
    } catch (error) {
      handleApiMessage(error.message, 'error');
    }
  };

  return (
    <>
      {error.open && (
        <ErrorBox>
          <Typography variant="body2" color="error">
            <ErrorIcon />
            {error.message}
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
