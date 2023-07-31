import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import {
  Button,
  Box,
  Typography,
  TextField,
  Divider,
  Tooltip,
} from '@mui/material';
import { MainContainer } from '@components/Layout/Styles/globals';

import { FormContent, ProviderContainer, CredentialsContainer } from './styled';

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Sign In - JWTours</title>
      </Head>

      <MainContainer>
        <form>
          <FormContent>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Tooltip title="App Logo" arrow placement="top">
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
            </Box>
            <ProviderContainer>
              <Button
                variant="contained"
                onClick={() => signIn('google', { callbackUrl: '/' })}
                sx={{
                  bgcolor: 'var(--light)',
                  color: '#000',
                  ':hover': { bgcolor: 'var(--light)' },
                }}
              >
                <Image
                  src={'/assets/providers/google.svg'}
                  width={30}
                  height={30}
                  priority
                  alt="Google logo"
                />
                <Typography variant="body2">Sign in with Google</Typography>
              </Button>
              <Button
                variant="contained"
                onClick={() => signIn('github', { callbackUrl: '/' })}
                sx={{
                  bgcolor: 'var(--pastel-dark)',
                  color: '#fff',
                  ':hover': { bgcolor: 'var(--pastel-dark)' },
                }}
              >
                <Image
                  src={'/assets/providers/github.svg'}
                  width={30}
                  height={30}
                  priority
                  alt="GitHub logo"
                />

                <Typography variant="body2">Sign in with GitHub</Typography>
              </Button>
              <Button
                variant="contained"
                onClick={() => signIn('facebook', { callbackUrl: '/' })}
                sx={{
                  bgcolor: 'var(--pastel-blue)',
                  color: '#fff',
                  ':hover': { bgcolor: 'var(--pastel-blue)' },
                }}
              >
                <Image
                  src={'/assets/providers/facebook.svg'}
                  width={30}
                  height={30}
                  priority
                  alt="Facebook logo"
                />
                <Typography variant="body2">Sign in with Facebook</Typography>
              </Button>
            </ProviderContainer>

            <Divider sx={{ m: 1 }}>OR</Divider>

            <CredentialsContainer>
              <TextField label="Email" variant="outlined" />
              <TextField label="Password" variant="outlined" />
              <Button variant="contained">Sign in</Button>
              <Divider sx={{ mt: 2 }} />
              <Typography variant="body2" sx={{ textAlign: 'right', mt: 1 }}>
                <Link href="/">
                  <a>Forgot password?</a>
                </Link>
              </Typography>
            </CredentialsContainer>
          </FormContent>
        </form>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="body1">Don&apos;t have an account?</Typography>
          <Link href="/">
            <a>
              <Typography variant="body1" sx={{ ml: 1 }}>
                Sign up
              </Typography>
            </a>
          </Link>
        </Box>
      </MainContainer>
    </>
  );
}
