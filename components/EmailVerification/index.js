import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MainContainer } from '@components/Layout/Styles/globals';
import { Typography, Box, Button } from '@mui/material';
import Footer from '@components/Layout/Footer';
import axios from 'axios';
import { errorHandler } from '@utils/helper/errorHandler';
import { useMessageStore } from '@stores/messageStore';
import { AlertMessage } from '@utils/helper/alertMessage';

export default function EmailVerification() {
  const { success, error, handleApiMessage, alert, handleAlertMessage } =
    useMessageStore();

  const [code, setCode] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);

  const router = useRouter();
  const { email, token } = router.query;

  useEffect(() => {
    sendToken(email, token);

    const isResendDisabled = localStorage.getItem('resendDisabled');

    const storedToken = localStorage.getItem('token');

    if (isResendDisabled && token === storedToken) {
      setResendDisabled(true);
    } else {
      setResendDisabled(false);
    }
  }, [email, token]);

  const sendToken = async (email, token) => {
    try {
      const url = `/api/verify?email=${email}&token=${token}`;
      const { data } = await axios.put(url);

      handleApiMessage(data.message, 'success');
      localStorage.removeItem('resendDisabled');
      localStorage.removeItem('token');
    } catch (error) {
      const { code, message } = errorHandler(error);
      setCode(code);

      handleApiMessage(message, 'error');
    }
  };

  const handleResendVerificationEmail = async (email) => {
    try {
      const url = `/api/auth/resend-verification?email=${email}`;
      const { data } = await axios.post(url);

      handleAlertMessage(data.message, 'success');
      setResendDisabled(true);
      localStorage.setItem('resendDisabled', 'true');
      localStorage.setItem('token', token);
    } catch (error) {
      const { message } = errorHandler(error);
      handleApiMessage(message, 'error');
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

      <MainContainer sx={{ mx: 2, textAlign: 'center' }}>
        {success.open && (
          <>
            <Typography variant="h4">{success.message}</Typography>

            <Box sx={{ my: 2 }}>
              <Link href="/auth/signin" replace>
                <a>
                  <Button variant="contained" sx={{ p: 1 }}>
                    Click here to Sign In
                  </Button>
                </a>
              </Link>
            </Box>
          </>
        )}

        {error.open && (
          <>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Authentication Failed
            </Typography>
            <Typography variant="h6" sx={{ my: 4, mx: 1 }}>
              {error.message}
            </Typography>

            {code === 'TOKEN_EXPIRED' && (
              <Button
                variant="contained"
                disabled={resendDisabled}
                onClick={() => handleResendVerificationEmail(email)}
                sx={{ p: 1 }}
              >
                {resendDisabled
                  ? 'Email sent successfully!'
                  : 'Resend verification email'}
              </Button>
            )}
          </>
        )}
      </MainContainer>
      <Footer />
    </>
  );
}
