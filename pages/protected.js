import Link from 'next/link';
import Head from 'next/head';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { Button, Typography } from '@mui/material';
import { MainContainer } from '@components/Layout/Styles/globals';
import LoadingBar from '@components/Layout/Loaders/LinearProgress';
import Dashboard from '@components/Protected/Dashboard';
import { companyName } from '@utils/helper/navigation';

export default function Protected() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  return (
    <>
      <Head>
        <title>{`Dashboard - ${companyName}`}</title>
      </Head>

      {isAuthenticated ? (
        <MainContainer>
          <Dashboard />
        </MainContainer>
      ) : isLoading ? (
        <LoadingBar />
      ) : (
        <MainContainer>
          <Typography variant="body1">Access Denied</Typography>
          <br />
          <Typography variant="body1">
            You need to <a onClick={() => signIn()}>Sign In</a> or Go to{' '}
            <Link href="/">
              <a>Home page</a>
            </Link>
          </Typography>
        </MainContainer>
      )}
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
