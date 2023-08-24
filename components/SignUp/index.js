import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip } from '@mui/material';
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

      <MainContainer>
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

        <form>
          <StyledBox>
            <FormDetails />
          </StyledBox>
        </form>
      </MainContainer>
      <Footer />
    </>
  );
}
