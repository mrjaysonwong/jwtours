import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Tooltip, Typography, Box } from '@mui/material';
import { MainContainer } from '@components/Layout/Styles/globals';
import { StyledForm } from '@components/Layout/Styles/globals';
import SignUpForm from './SignUpForm';
import Footer from '@components/Layout/Footer';

export default function SignUp() {
  return (
    <>
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

        <Box component="form">
          <StyledForm>
            <SignUpForm />
          </StyledForm>
        </Box>

        <Typography variant="body1">
          Already have an account? <a onClick={() => signIn()}>Sign In</a>
        </Typography>
      </MainContainer>
      <Footer />
    </>
  );
}
