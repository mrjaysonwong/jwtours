import Head from 'next/head';
import { companyName } from '@utils/helper/functions/navigation';
import EmailVerification from '@components/EmailVerification/EmailVerification';
import { AppBar, Toolbar } from '@mui/material';
import Logo from '@components/Layout/Navbar/Logo/Logo';
import { MainContainer } from '@components/Layout/Styles/globals';
import Footer from '@components/Layout/Footer/Footer';

export default function VerificationPage() {
  return (
    <>
      <Head>
        <title>{`Verify Email - ${companyName}`}</title>
      </Head>

      <MainContainer sx={{ m: 2, textAlign: 'center' }}>
        <AppBar elevation={0} color="inherit">
          <Toolbar>
            <Logo />
          </Toolbar>
        </AppBar>

        <EmailVerification />
      </MainContainer>

      <Footer />
    </>
  );
}
