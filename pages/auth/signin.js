import { useState } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@pages/api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SignIn from '@components/Signin';
import { useEffect } from 'react';
import { Box, LinearProgress } from '@mui/material';

export default function SignInPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If there is an active session, add a small delay using setTimeout
    if (session) {
      const timeoutId = setTimeout(() => {
        router.push('/');
      }, 1000); // Adjust the delay time (in milliseconds) as needed

      // Clear the timeout when the component unmounts to avoid any potential memory leaks
      return () => clearTimeout(timeoutId);
    } else {
      setLoading(false); // Set loading to false if there is no active session
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (session) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
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
