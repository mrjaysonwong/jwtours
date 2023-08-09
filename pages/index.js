import Head from 'next/head';
import { signIn, signOut } from 'next-auth/react';
import { Button, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { MainContainer } from '@components/Layout/Styles/globals';
import Navbar from '@components/Layout/Navbar';
import Footer from '@components/Layout/Footer';

export default function Home({ session }) {
  const user = session?.user;

  return (
    <>
      <Head>
        <title>JWTours</title>
      </Head>

      <Navbar user={user} />
      <MainContainer>
        <Typography>Lorem ipsum</Typography>
        {session ? (
          <Button onClick={() => signOut()}>Sign Out</Button>
        ) : (
          <Button onClick={() => signIn()}>Sign In</Button>
        )}
      </MainContainer>
      <Footer />
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
