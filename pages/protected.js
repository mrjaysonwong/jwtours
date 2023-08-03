import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { Button } from '@mui/material';
import { MainContainer } from '@components/Layout/Styles/globals';

export default function Protected() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  return (
    <MainContainer>
      {isAuthenticated ? (
        <>
          <h1>Protected Page</h1>
          <p>You can view this page because you are signed in.</p>
          <Link href="/">
            <Button variant="outlined">Back to Home page</Button>
          </Link>
        </>
      ) : null}

      {!isAuthenticated && status !== 'loading' && (
        <>
          <p>Access Denied</p>
          <p>
            You need to <a onClick={() => signIn()}>Sign in</a>
          </p>
        </>
      )}
    </MainContainer>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);

  return {
    props: {
      session,
    },
  };
}
