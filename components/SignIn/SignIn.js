import React, { useState, createContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Typography, Divider, Tooltip } from '@mui/material';
import { MainContainer } from '@components/Layout/Styles/globals';
import { SignInWithContainer, CredentialsContainer } from './styled';
import { StyledForm } from '@components/Layout/Styles/globals';
import OAuth from './OAuth/OAuth';
import Email from './Email/Email';
import Credentials from './Credentials/Credentials';
import Footer from '@components/Layout/Footer/Footer';

export const ShowFormContext = createContext(null);

export default function SignIn() {
  const [showOAuth, setShowOAuth] = useState(true);
  const [showSendLink, setShowSendLink] = useState(false);
  const [showCredentials, setShowCredentials] = useState(true);

  const values = {
    showOAuth,
    setShowOAuth,
    showSendLink,
    setShowSendLink,
    showCredentials,
    setShowCredentials,
  };

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
            <ShowFormContext.Provider value={values}>
              <SignInWithContainer>
                {showOAuth && <OAuth />}

                <Email />
              </SignInWithContainer>

              {showCredentials && (
                <>
                  <Divider sx={{ my: 2 }}>OR</Divider>

                  <CredentialsContainer>
                    <Credentials />
                  </CredentialsContainer>
                </>
              )}
            </ShowFormContext.Provider>
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
