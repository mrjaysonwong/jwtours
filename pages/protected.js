import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { Button } from '@mui/material';
import { MainContainer } from '@components/Layout/Styles/globals';
import LoadingBar from '@components/Layout/Loaders/LinearProgress';
import Dashboard from '@components/Protected/Dashboard';

export default function Protected() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  return (
    <>
      {isAuthenticated ? (
        <MainContainer>
          <Dashboard />
        </MainContainer>
      ) : isLoading ? (
        <LoadingBar />
      ) : (
        <MainContainer>
          <p>Access Denied</p>
          <p>
            You need to
            <Button variant="text" onClick={() => signIn()}>
              Sign In
            </Button>
          </p>
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
