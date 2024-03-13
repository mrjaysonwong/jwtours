import { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { MainContainer } from '@components/Layout/Styles/globals';
import CircularIndeterminate from '@components/Layout/Loaders/CircularProgress';

export default function Verify() {
  const router = useRouter();
  const { email, token, mode, callbackUrl } = router.query;

  const handleSignIn = async () => {
    if (email) {
      const res = await signIn('email', {
        redirect: false,
        email: email,
        token: token,
        mode: mode,
      });

      if (res.ok) {
        router.push(callbackUrl ?? '/');
        return;
      }

      if (!res.ok) {
        const [message, statusCode] = res.error.split(',');

        if (+statusCode === 500) {
          res.status = 500;
          router.push('/notifications/error');
        } else {
          router.replace('/notifications/authentication-failed');
        }
      }
    }
  };

  useEffect(() => {
    handleSignIn();
  }, []);

  return (
    <MainContainer>
      <CircularIndeterminate />
    </MainContainer>
  );
}
