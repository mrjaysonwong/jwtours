import Head from 'next/head';
import { Box, Typography, Card, CardMedia } from '@mui/material';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@pages/api/auth/[...nextauth]';
import { MainContainer } from '@components/Layout/Styles/globals';
import Navbar from '@components/Layout/Navbar/Navbar';
import Footer from '@components/Layout/Footer/Footer';
import { companyName } from '@utils/helper/functions/navigation';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <>
      <Head>
        <title>{companyName}</title>
      </Head>

      <Navbar user={user} />
      <Box>
        <CardMedia
          sx={{
            height: '100vh',
            backgroundSize: 'clip',
            backgroundPosition: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
          image="https://res.cloudinary.com/dpyxciwcu/image/upload/v1706794804/jwtours/background/beach_fcshw2.jpg"
          alt="Landing background-image"
        />
      </Box>
      <MainContainer>
        <Typography variant="body1">Lorem Ipsum</Typography>
      </MainContainer>
      <Footer />
    </>
  );
}

// export async function getServerSideProps({ req, res }) {
//   const session = await getServerSession(req, res, authOptions);

//   return {
//     props: {
//       session,
//     },
//   };
// }
