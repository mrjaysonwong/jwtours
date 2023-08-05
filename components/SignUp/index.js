import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Typography, Divider, Tooltip } from '@mui/material';
import { MainContainer } from '@components/Layout/Styles/globals';
import { FormContent } from '@components/Layout/Styles/globals';
import FormDetails from './FormDetails';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Sign Up - JWTours</title>
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

            <FormDetails />
          </FormContent>
        </form>
      </MainContainer>
    </>
  );
}
