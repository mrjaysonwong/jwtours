import Head from 'next/head';
import { getServerSession } from 'next-auth';
import { authOptions } from '@pages/api/auth/[...nextauth]';
import { Typography } from '@mui/material';
import { MainContainer } from '@components/Layout/Styles/globals';
import Navbar from '@components/Layout/Navbar/Navbar';
import Footer from '@components/Layout/Footer/Footer';
import { companyName } from '@utils/helper/functions/navigation';

export default function UserAgreementPage({ session }) {
  const user = session?.user;
  return (
    <>
      <Head>
        <title>{`User Agreement - ${companyName}`}</title>
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
