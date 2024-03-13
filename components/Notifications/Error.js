import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Typography, Box, Button } from '@mui/material';

export default function Error() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <>
      <Head>
        <title>{`Error`}</title>
      </Head>

      <Box>
        <Typography variant="h2">
          <b>ERROR</b>
        </Typography>
      </Box>

      <Box>
        <Image
          src={'/assets/error_vector.png'}
          width={170}
          height={140}
          priority
          alt="error_icon"
        />

        <Typography variant="h6">
          {error ?? 'Unexpected error occurred. Please try again.'}
        </Typography>

        <Button variant="outlined" onClick={() => router.back()} sx={{ my: 2 }}>
          Go Back
        </Button>
      </Box>
    </>
  );
}
