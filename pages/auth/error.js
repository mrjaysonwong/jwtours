import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MainContainer } from '@components/Layout/Styles/globals';
import { Typography, Box, Button } from '@mui/material';
import { companyName } from '@utils/helper/functions/navigation';

// landing page for Error in Auth Provider
export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;
  return (
    <>
      <Head>
        <title>{`Error - ${companyName}`}</title>
      </Head>

      <MainContainer>
        <Typography variant="h6" textAlign="center" sx={{ mx: 4 }}>
          {error}
        </Typography>

        <Box
          sx={{
            my: 2,
          }}
        >
          <Link href="/auth/signin" replace>
            <a>
              <Button variant="contained" sx={{ p: 1, mr: 2 }}>
                Refresh
              </Button>
            </a>
          </Link>

          <Link href="/" replace>
            <a>
              <Button variant="outlined" sx={{ p: 1 }}>
                Return to Home
              </Button>
            </a>
          </Link>
        </Box>
      </MainContainer>
    </>
  );
}
