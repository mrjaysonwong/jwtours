import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import { Button, Typography } from '@mui/material';
// import { getServerSession } from 'next-auth';
// import { getSession } from 'next-auth/react';
// import { authOptions } from './api/auth/[...nextauth]';
import { getToken } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import { MainContainer } from '@components/Layout/Styles/globals';

export default function Home({ session }) {
  // const { data: session } = useSession();
  // const user = session?.user;
  const user = session;

  return (
    <>
      <Head>
        <title>JWTours</title>
      </Head>

      <MainContainer>
        {session ? (
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
            <Button>
              <Link href="/protected">
                <a>Protected Page</a>
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1">Not signed in</Typography>

            <Button variant="contained" onClick={() => signIn()} sx={{ mt: 1 }}>
              Sign in
            </Button>
            <br />
            <Button>
              <Link href="/protected">
                <a>Protected Page</a>
              </Link>
            </Button>
          </>
        )}
      </MainContainer>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getToken({ req });

  return {
    props: {
      session,
    },
  };
}
