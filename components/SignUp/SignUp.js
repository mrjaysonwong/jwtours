import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Tooltip, Typography, Box } from '@mui/material';
import { MainContainer } from '@components/Layout/Styles/globals';
import { StyledForm } from '@components/Layout/Styles/globals';
import SignUpForm from './SignUpForm/SignUpForm';
import Footer from '@components/Layout/Footer/Footer';

export default function SignUp() {
  useEffect(() => {
    const storedMode = sessionStorage.getItem('mode');

    if (
      storedMode === 'signin-with-email' ||
      storedMode === 'signin-with-credentials'
    ) {
      sessionStorage.clear();
    }
  }, []);

  return (
    <>
      <MainContainer sx={{ py: 4 }}>
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

        <Box component="form">
          <StyledForm>
            <SignUpForm />
          </StyledForm>
        </Box>

        <Typography>
          Already have an account? <a onClick={() => signIn()}>Sign In</a>
        </Typography>
      </MainContainer>
      <Footer />
    </>
  );
}
