import { useEffect } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@pages/api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Box, LinearProgress } from '@mui/material';
import SignIn from '@components/Signin';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      const timeoutId = setTimeout(() => {
        router.back();
      }, 1000);

      // Clean up function
      return () => clearTimeout(timeoutId);
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress aria-describedby="Loading bar" aria-busy="true" />
      </Box>
    );
  }

  return <SignIn />;
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);

  return {
    props: {
      session,
    },
  };
}
