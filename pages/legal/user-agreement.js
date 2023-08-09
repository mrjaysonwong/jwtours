import Head from 'next/head';
import { getServerSession } from 'next-auth';
import { authOptions } from '@pages/api/auth/[...nextauth]';
import { Typography } from '@mui/material';
import { MainContainer } from '@components/Layout/Styles/globals';
import Navbar from '@components/Layout/Navbar';
import Footer from '@components/Layout/Footer';

export default function UserAgreement({ session }) {
  const user = session?.user;
  return (
    <>
      <Head>
        <title>User Agreement - JWTours</title>
      </Head>

      <Navbar user={user} />
      <MainContainer>
        <Typography variant="h6">User Agreement</Typography>
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
