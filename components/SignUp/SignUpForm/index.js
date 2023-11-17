import { useState } from 'react';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@utils/yup/credentialsSchema';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
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
import { createUser } from '@utils/api/client/user/authorize/user/createUser';
import { useMessageStore } from '@stores/messageStore';
import { AlertMessage, ErrorMessage } from '@utils/helper/alertMessage';
import UseOfEmail from '@components/Layout/Dialog/UseOfEmail';

export default function SignUpForm() {
  const { error, alert, handleApiMessage, handleAlertMessage, handleOnClose } =
    useMessageStore();

  const clearError = () => {
    useMessageStore.setState(() => ({ error: { open: false } }));
  };

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
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (values) => {
    try {
      const data = await createUser(values);

      handleAlertMessage(data.message, 'success');
      clearError();
      reset();

      setTimeout(() => {
        window.location.href = '/auth/signin';
      }, 3000);
    } catch (error) {
      handleApiMessage(error.message, 'error');
    }
  };

  return (
    <>
      {alert.open && (
        <AlertMessage
          open={true}
          message={alert.message}
          severity={alert.severity}
        />
      )}

      {error.open && <ErrorMessage message={error.message} />}

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Stack direction="column">
          <TextField
            name="firstName"
            label="First Name"
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
          error={Boolean(errors.email)}
          {...register('email')}
        />

        {errors.email && (
          <Typography variant="body2" color="error" className="error">
            {errors.email?.message}
          </Typography>
        )}

        <FormControl>
          <FormLabel
            id="row-radio-buttons-gender"
            error={Boolean(errors.gender)}
          >
            Gender
          </FormLabel>
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <RadioGroup
                row
                aria-labelledby="gender"
                onChange={(e) => field.onChange(e.target.value)}
                {...field}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            )}
          />

          {errors.gender && (
            <Typography variant="body2" color="error" className="error">
              {errors.gender?.message}
            </Typography>
          )}
        </FormControl>

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