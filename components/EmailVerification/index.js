import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MainContainer } from '@components/Layout/Styles/globals';
import { useSession } from 'next-auth/react';
import { Typography, Box, Stack, Snackbar } from '@mui/material';
import { StyledButton } from '@components/Layout/Styles/globals';
import { Alert } from '@utils/helper/alertMessage';
import Footer from '@components/Layout/Footer';
import { methodPUT } from '@utils/api/client/email/verify/PUT';
import { methodPOST } from '@utils/api/client/email/resend-verification/POST';
import { useMessageStore } from '@stores/messageStore';

export default function EmailVerification() {
  const { success, error, handleApiMessage, alert, handleAlertMessage } =
    useMessageStore();

  const { status } = useSession();

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
      const data = await methodPUT(email, token);

      if (data.error) {
        setCode(data.error.code);
        handleApiMessage(data.error.message, 'error');
        return;
      }

      handleApiMessage(data.message, 'success');
    } catch (error) {
      handleApiMessage(error.message, 'error');
    }
  };

  const handleResendVerificationEmail = async (email) => {
    try {
      const data = await methodPOST(email);

      if (data.error) {
        handleApiMessage(data.error.message, 'error');
        return;
      }

      handleAlertMessage(data.message);
      setResendDisabled(true);
      localStorage.setItem('resendDisabled', 'true');
      localStorage.setItem('token', token);
    } catch (error) {
      handleApiMessage(error.message, 'error');
    }
  };

  if (status === 'loading') return null;
  
  return (
    <>
      {alert.open && (
        <Stack>
          <Snackbar
            open={true}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          >
            <Alert severity="success" sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
        </Stack>
      )}

      <MainContainer sx={{ mx: 2, textAlign: 'center' }}>
        {success.open && (
          <>
            <Typography variant="h4">{success.message}</Typography>

            <Box sx={{ my: 2 }}>
              <Link href="/auth/signin" replace>
                <a>
                  <StyledButton variant="contained" sx={{ p: 1 }}>
                    Click here to Sign In
                  </StyledButton>
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
            <Typography variant="body1" sx={{ my: 4, mx: 1 }}>
              {error.message}
            </Typography>

            {code === 'TOKEN_EXPIRED' && (
              <StyledButton
                disabled={resendDisabled}
                onClick={() => handleResendVerificationEmail(email)}
                sx={{ p: 1 }}
              >
                {resendDisabled
                  ? 'Email Sent Successfully'
                  : 'Resend verification email'}
              </StyledButton>
            )}
          </>
        )}
      </MainContainer>
      <Footer />
    </>
  );
}
