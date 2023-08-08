import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import { Button, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
// import { getSession } from 'next-auth/react';
// import { getToken } from 'next-auth/jwt';
// import { useSession } from 'next-auth/react';
import { MainContainer } from '@components/Layout/Styles/globals';
import Navbar from '@components/Layout/Navbar';

export default function Home({ session }) {
  const user = session?.user;

  return (
    <>
      <Head>
        <title>JWTours</title>
      </Head>
      <Navbar />
      <MainContainer>

        <Typography>Lorem ipsum</Typography>
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
