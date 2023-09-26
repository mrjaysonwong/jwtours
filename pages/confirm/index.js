import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MainContainer } from '@components/Layout/Styles/globals';
import { Typography, Button, Box } from '@mui/material';
import { StyledButton } from '@components/Layout/Styles/globals';
import Footer from '@components/Layout/Footer';
import { companyName } from '@utils/helper/common';

export default function EmailVerificationPage() {
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const { email, token } = router.query;

  useEffect(() => {
    sendToken(email, token);
  }, [email, token]);

  const sendToken = async (email, token) => {
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await fetch(
        `/api/confirm?email=${email}&token=${token}`,
        options
      );

      let data;

      if (res.ok) {
        data = await res.json();
        setSuccessMessage(data.message);
      } else {
        setError(true);
        data = await res.json();
        setErrorMessage(data.error.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
    <Head>
      <title>{`Confirm - ${companyName}`}</title>
    </Head>

      <MainContainer sx={{ mx: 2, textAlign: 'center' }}>
        {successMessage && (
          <>
            <Typography variant="h4">{successMessage}</Typography>

            <Box sx={{ my: 2 }}>
              <Link href="/auth/signin" replace>
                <a>
                  <StyledButton variant="contained" sx={{ p: 2 }}>
                    Click here to Sign In
                  </StyledButton>
                </a>
              </Link>
            </Box>
          </>
        )}

        {error && (
          <>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Authentication Failed
            </Typography>
            <Typography variant="body1" sx={{ mt: 4, mx: 1 }}>
              {errorMessage}
            </Typography>
            <Button variant="contained" sx={{ my: 2 }}>
              Resend Verification Email
            </Button>
          </>
        )}
      </MainContainer>
      <Footer />
    </>
  );
}
