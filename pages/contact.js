import Head from 'next/head';
import { Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { MainContainer } from '@components/Layout/Styles/globals';
import Navbar from '@components/Layout/Navbar/Navbar';
import Footer from '@components/Layout/Footer/Footer';
import { companyName } from '@utils/helper/functions/navigation';
import Error from 'next/error';

export default function Contact({ session, errorCode, statusText }) {
  const user = session?.user;

  if (errorCode) {
    return (
      <>
        <MainContainer>
          <Error statusCode={errorCode} />
        </MainContainer>
        <Footer />
      </>
    );
  }

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

  const response = await fetch('http://localhost:3000/api/users');
  const errorCode = response.ok ? false : response.status;

  return {
    props: { session, errorCode, statusText: response.statusText },
  };
}
