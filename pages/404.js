import Head from 'next/head';
import Link from 'next/link';
import { Typography, Button } from '@mui/material';
import { MainContainer } from '@components/Layout/Styles/globals';
import { companyName } from '@utils/helper/functions/navigation';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>{`404 Page Not Found - ${companyName}`}</title>
      </Head>

      <MainContainer>
        <Typography variant="h4">404 Page Not Found</Typography>
        <br />
        <Link href="/">
          <Button variant="outlined">Back to Home page</Button>
        </Link>
      </MainContainer>
    </>
  );
}
