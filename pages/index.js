import { signIn, signOut } from 'next-auth/react';
import { Button, Typography, Box } from '@mui/material';
import { getToken } from 'next-auth/jwt';
import { MainContainer } from '@components/Layout/Styles/globals';

export default function Home({ user }) {
  return (
  
      <MainContainer>
        {user ? (
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

  );
}

export async function getServerSideProps(ctx) {
  const token = await getToken(ctx);

  return {
    props: {
      user: token,
    },
  };
}
