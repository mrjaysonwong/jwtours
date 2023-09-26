import Head from 'next/head';
import Link from 'next/link';
import { Typography, Button } from '@mui/material';
import { MainContainer } from '@components/Layout/Styles/globals';
import { companyName } from '@utils/helper/common';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>{`500 Server Error - ${companyName}`}</title>
      </Head>

      <MainContainer>
        <Typography variant="h4">500 Internal Server Error</Typography>
        <br />
        <Link href="/">
          <Button variant="outlined">Back to Home page</Button>
        </Link>
      </MainContainer>
    </>
  );
}
