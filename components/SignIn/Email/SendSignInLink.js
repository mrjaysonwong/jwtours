import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { TextField, Typography, Box } from '@mui/material';
import { StyledButton } from '@components/Layout/Styles/globals';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSchema } from '@utils/yup/personalInfoSchema';
import { FieldErrorMessage } from '@utils/helper/custom-components/CustomMessages';
import axios from 'axios';
import CircularIndeterminate from '@components/Layout/Loaders/CircularProgress';
import { errorHandler } from '@utils/helper/functions/errorHandler';
import { useMessageStore } from '@stores/messageStore';
import { AlertMessage } from '@utils/helper/custom-components/CustomMessages';

export default function SendSignInLink() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [didSubmit, setDidSubmit] = useState(false);

  const [requestCounter, setRequestCounter] = useState(0);
  const [countDown, setCountDown] = useState(60);

  const { alert, handleAlertMessage, handleOnClose } = useMessageStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const onSubmit = async (values) => {
    try {
      const mode = 'signin';
      const type = 'email';

      const url = `/api/auth/verify?mode=${mode}&type=${type}&callbackUrl=${router.query.callbackUrl}`;

      const { data } = await axios.patch(url, values);

      if (data) {
        reset();
        setEmail(values.email);
        setDidSubmit(true);
      }
    } catch (error) {
      const { errorMessage } = errorHandler(error);

      setRequestCounter((prevCount) => prevCount + 1);

      handleAlertMessage(errorMessage, 'error');
    }
  };

  useEffect(() => {
    if (requestCounter === 5 && countDown > 0) {
      const intervalId = setInterval(() => {
        setCountDown((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [requestCounter, countDown]);

  useEffect(() => {
    if (countDown === 0) {
      setRequestCounter(0);
      setCountDown(60);
    }
  }, [countDown]);

  return (
    <>
      {!didSubmit && (
        <>
          <AlertMessage
            open={alert.open}
            message={alert.message}
            severity={alert.severity}
            onClose={handleOnClose}
          />

          <Typography variant="body1" sx={{ mb: 1 }}>
            We&apos;ll email you a sign-in link.
          </Typography>

          <TextField
            {...register('email')}
            fullWidth
            label="Email"
            name="email"
            error={Boolean(errors.email)}
            sx={{ mt: 1 }}
          />
          <FieldErrorMessage error={errors.email} />

          <StyledButton
            fullWidth
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || requestCounter === 5}
            sx={{ py: 1, my: 2 }}
          >
            {isSubmitting ? (
              <CircularIndeterminate />
            ) : requestCounter === 5 ? (
              `Try again in ${countDown}s`
            ) : (
              'Send Link'
            )}
          </StyledButton>
        </>
      )}

      {didSubmit && (
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: 280,
          }}
        >
          <Typography variant="h5">Check your email</Typography>
          <Image
            src={'/assets/email_sent.png'}
            width={120}
            height={110}
            priority
            alt="error_vector"
          />
          <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
            We&apos;ve sent a sign in link to {email}
          </Typography>
          <br />
          <Typography variant="body2" color="gray">
            Didn&apos;t get the email? Request sign in link again.
          </Typography>
        </Box>
      )}
    </>
  );
}
