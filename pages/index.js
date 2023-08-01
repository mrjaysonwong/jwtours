import Head from 'next/head';
import { signIn, signOut } from 'next-auth/react';
import { Button, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { MainContainer } from '@components/Layout/Styles/globals';

export default function Home() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const user = session?.user;

  return (
    <>
      <Head>
        <title>JWTours</title>
      </Head>

      <MainContainer>
        {isAuthenticated ? (
          <>
            <Typography variant="body1">Fullname: {user.name}</Typography>

            <Typography variant="body1">Signed in as {user.email}</Typography>

            <Button
              variant="contained"
              onClick={() => signOut({ callbackUrl: '/' })}
              sx={{ mt: 1 }}
            >
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1">Not signed in</Typography>

            <Button variant="contained" onClick={() => signIn()} sx={{ mt: 1 }}>
              Sign in
            </Button>
            <br />
          </>
        )}
      </MainContainer>
    </>
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
