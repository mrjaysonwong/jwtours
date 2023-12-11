import { createContext } from 'react';
import Head from 'next/head';
import { getServerSession } from 'next-auth';
import { authOptions } from '@pages/api/auth/[...nextauth]';
import { companyName } from '@utils/helper/navigation';
import AccountProfile from '@components/Account/Profile';
import Navbar from '@components/Layout/Navbar';

export const UserContext = createContext();

export default function AccountProfilePage({ session }) {
  const user = session.user;
  const userId = user._id;

  return (
    <>
      <Head>
        <title>{`Profile Settings - ${companyName}`}</title>
      </Head>

      <Navbar user={user} />

      <UserContext.Provider value={{ user, userId }}>
        <AccountProfile />
      </UserContext.Provider>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
