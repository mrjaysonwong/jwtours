import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MainContainer } from '@components/Layout/Styles/globals';
import { Typography } from '@mui/material';

export default function EmailVerification() {
  const router = useRouter();

  useEffect(() => {

    console.log('router isReady?',router.isReady)

    if (router.isReady) {
      const { token } = router.query;
      sendToken(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendToken = async (token) => {
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await fetch(`/api/auth/user/email/${token}`, options);

      if (res.ok) {
        const data = await res.json();
        console.log(data.message);
        setTimeout(() => {
          router.replace('/auth/signin')
        }, 3000);
      }
    } catch (error) {
      console.error(error.message);
    }
  };



  return (
    <MainContainer>
      <Typography variant="h4">Email Verified Successfully</Typography>
    </MainContainer>
  );
}
