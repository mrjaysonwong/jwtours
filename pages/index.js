import Head from 'next/head';
import { Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { MainContainer } from '@components/Layout/Styles/globals';
import Navbar from '@components/Layout/Navbar';
import Footer from '@components/Layout/Footer';
import { companyName } from '@utils/helper/common';

export default function Home({ session }) {
  const user = session?.user;

  return (
    <>
      <Head>
        <title>{companyName}</title>
      </Head>

      <Navbar user={user} />
      <MainContainer>
        <Typography>Lorem ipsum</Typography>
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
