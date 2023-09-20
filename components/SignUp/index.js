import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip, Typography } from '@mui/material';
import { MainContainer } from '@components/Layout/Styles/globals';
import { StyledBox } from '@components/Layout/Styles/globals';
import FormDetails from './FormDetails';
import Footer from '@components/Layout/Footer';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Sign Up - JWTours</title>
      </Head>

      <MainContainer sx={{ pt: 2 }}>
        <Tooltip title="App Logo" arrow placement="left">
          <div>
            <Link href="/">
              <a>
                <Image
                  src={'/assets/logo.png'}
                  width={70}
                  height={40}
                  priority
                  alt="logo"
                />
              </a>
            </Link>
          </div>
        </Tooltip>

        <form autoComplete="off">
          <StyledBox>
            <FormDetails />
          </StyledBox>
        </form>

        <Typography variant="body1">
          Already have an account?{' '}
          <Link href="/auth/signin">
            <a>Sign In</a>
          </Link>
        </Typography>
      </MainContainer>
      <Footer />
    </>
  );
}
