import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MainContainer } from '@components/Layout/Styles/globals';
import { Typography } from '@mui/material';
import { StyledButton } from '@components/Layout/Styles/globals';
import { companyName } from '@utils/helper/common';

export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;
  return (
    <>
      <Head>
        <title>{`Error - ${companyName}`}</title>
      </Head>

      <MainContainer>
        <Typography variant="h6">{error}</Typography>
        <Link href="/" replace>
          <a>
            <StyledButton sx={{ p: 2, mt: 2 }}>Return to Home</StyledButton>
          </a>
        </Link>
      </MainContainer>
    </>
  );
}
