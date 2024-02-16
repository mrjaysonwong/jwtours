import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MainContainer } from '@components/Layout/Styles/globals';
import { Typography, Button } from '@mui/material';
import Footer from '@components/Layout/Footer/Footer';
import axios from 'axios';
import { errorHandler } from '@utils/helper/functions/errorHandler';
import { useMessageStore } from '@stores/messageStore';
import { AlertMessage } from '@utils/helper/custom-components/CustomMessages';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ErrorIcon from '@mui/icons-material/Error';

export default function EmailVerification() {
  const { success, error, handleApiMessage, alert, handleAlertMessage } =
    useMessageStore();

  const [code, setCode] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);

  const router = useRouter();
  const { email, token } = router.query;

  const sendToken = async (email, token) => {
    try {
      const url = `/api/auth/email/verify?email=${email}&token=${token}`;

      const { data } = await axios.patch(url);

      handleApiMessage(data.message, 'success');
      localStorage.removeItem('resendDisabled');
      localStorage.removeItem('token');
    } catch (error) {
      console.error(error);

      const { code, message } = errorHandler(error);

      setCode(code);
      handleApiMessage(message, 'error');
    }
  };

  const handleResendVerificationEmail = async (email) => {
    try {
      const url = `/api/auth/email/resend-verification?email=${email}`;

      const { data } = await axios.post(url);

      handleAlertMessage(data.message, 'success');
      setResendDisabled(true);
      localStorage.setItem('resendDisabled', 'true');
      localStorage.setItem('token', token);
    } catch (error) {
      console.error(error);

      const { message } = errorHandler(error);
      handleApiMessage(message, 'error');
    }
  };

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

  return (
    <>
      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
      />

      <MainContainer
        sx={{
          mx: 2,
          textAlign: 'center',
          svg: {
            fontSize: '4rem',
            mb: 1,
          },
        }}
      >
        {success.open && (
          <>
            <VerifiedUserIcon color="success" />
            <Typography variant="h4">{success.message}</Typography>

            <Typography variant="h6" sx={{ my: 4 }}>
              You may close this window.
            </Typography>
          </>
        )}

        {error.open && (
          <>
            <ErrorIcon color="error" />
            <Typography variant="h4">Authentication Failed.</Typography>
            <Typography variant="h6" sx={{ my: 4, mx: 1 }}>
              {error.message}
            </Typography>

            {code === '401' && (
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
