import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Typography, Box, AppBar, Toolbar } from '@mui/material';
import axios from 'axios';
import { companyName } from '@utils/helper/functions/navigation';
import Logo from '@components/Layout/Navbar/Logo/Logo';
import { useMessageStore } from '@stores/messageStore';
import { AlertMessage } from '@utils/helper/custom-components/CustomMessages';
import { errorHandler } from '@utils/helper/functions/errorHandler';
import CircularIndeterminate from '@components/Layout/Loaders/CircularProgress';

export default function Confirmation() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { email } = router.query;

  const [decodedEmail, setDecodedEmail] = useState('');

  const { alert, handleAlertMessage, handleOnClose } = useMessageStore();

  const [didSubmit, setDidSubmit] = useState(false);
  const [countDown, setCountDown] = useState(60);

  const handleResendVerificationLink = async () => {
    try {
      const mode = 'resend-verification-link';
      const type = 'email';
      const url = `/api/auth/users/signup?email=${email}&mode=${mode}&type=${type}`;

      const { data } = await axios.patch(url);

      setDidSubmit(true);
      setCountDown(60);
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);

      handleAlertMessage(errorMessage, 'error');
    }
  };

  useEffect(() => {
    try {
      setDecodedEmail(decodeURIComponent(email));

      if (didSubmit && countDown > 0) {
        const intervalId = setInterval(() => {
          setCountDown((prevCount) => prevCount - 1);
        }, 1000);

        return () => clearInterval(intervalId);
      }
    } catch (error) {
      router.replace('/notifications/error');
    }
  }, [didSubmit, countDown]);

  useEffect(() => {
    if (!email) {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      router.push('/');
    }
  }, []);

  if (!email) {
    return <CircularIndeterminate />;
  }

  return (
    <>
      <Head>
        <title>{`Sign Up Confirmation - ${companyName}`}</title>
      </Head>

      <AppBar elevation={0} color="inherit">
        <Toolbar>
          <Logo />
        </Toolbar>
      </AppBar>

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleOnClose}
      />

      <Typography variant="h4" sx={{ fontWeight: 500 }}>
        Verify your Account
      </Typography>
      <Typography sx={{ my: 2 }}>
        We have sent a verification link to{' '}
        <span style={{ color: 'var(--palette-blue-dark' }}>{decodedEmail}</span>
      </Typography>
      <Typography>
        Click on the link to complete the verification process.
      </Typography>

      <Box sx={{ my: 2 }}>
        <Image
          src={'/assets/email_sent.png'}
          width={120}
          height={110}
          priority
          alt="error_vector"
        />
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Typography>Did not receive the email?</Typography>

        {didSubmit && countDown ? (
          <Typography color="gray" sx={{ ml: 1 }}>
            Resend in {countDown}s
          </Typography>
        ) : (
          <Box onClick={handleResendVerificationLink}>
            <Typography color={'info.dark'} sx={{ ml: 1, cursor: 'pointer' }}>
              Resend
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
