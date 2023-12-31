import Image from 'next/image';
import Link from 'next/link';
import { Box, Typography, Divider, Tooltip } from '@mui/material';
import { MainContainer } from '@components/Layout/Styles/globals';
import { ProviderContainer, CredentialsContainer } from './styled';
import { StyledForm } from '@components/Layout/Styles/globals';
import Provider from './Provider';
import Credentials from './Credentials';
import Footer from '@components/Layout/Footer';

export default function SignIn() {
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
            <ProviderContainer>
              <Provider />
            </ProviderContainer>

            <Divider sx={{ m: 1 }}>OR</Divider>

            <CredentialsContainer>
              <Credentials />
            </CredentialsContainer>
          </StyledForm>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Typography variant="body1">Don&apos;t have an account?</Typography>
          <Link href="/auth/signup">
            <a>
              <Typography variant="body1" sx={{ ml: 1 }}>
                Sign Up
              </Typography>
            </a>
          </Link>
        </Box>
      </MainContainer>
      <Footer />
    </>
  );
}
