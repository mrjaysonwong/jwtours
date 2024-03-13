import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Typography, Button, Box, AppBar, Toolbar } from '@mui/material';
import Logo from '@components/Layout/Navbar/Logo/Logo';
import { MainContainer } from '@components/Layout/Styles/globals';
import { companyName } from '@utils/helper/functions/navigation';
import Footer from '@components/Layout/Footer/Footer';

export default function Custom404() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{`404 Page Not Found - ${companyName}`}</title>
      </Head>

      <MainContainer sx={{ m: 2, textAlign: 'center' }}>
        <AppBar elevation={0} color="inherit">
          <Toolbar>
            <Logo />
          </Toolbar>
        </AppBar>

        <Box sx={{ position: 'relative', mb: 10 }}>
          <Typography variant="h1">
            <b>404</b>
          </Typography>
        </Box>
        <Box sx={{ ml: 4, position: 'absolute' }}>
          <Image
            src={'/assets/error_vector.png'}
            width={200}
            height={180}
            priority
            alt="error_vector"
          />
        </Box>

        <Box sx={{ mt: 7 }}>
          <Typography variant="h4" sx={{ my: 2 }}>
            <b>Page Not Found</b>
          </Typography>

          <Button variant="outlined" onClick={() => router.back()}>
            Go Back
          </Button>
        </Box>
      </MainContainer>

      <Footer />
    </>
  );
}
