import Head from 'next/head';
import { Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { MainContainer } from '@components/Layout/Styles/globals';
import Navbar from '@components/Layout/Navbar/Navbar';
import Footer from '@components/Layout/Footer/Footer';
import { companyName } from '@utils/helper/functions/navigation';

export default function Contact({ session }) {
  const user = session?.user;

  return (
    <>
      <Head>
        <title>{`Contact Us - ${companyName}`}</title>
      </Head>

      <Navbar user={user} />
      <MainContainer>
        <Typography>Contact Us!</Typography>
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
