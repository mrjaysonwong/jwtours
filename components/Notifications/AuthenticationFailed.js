import Head from 'next/head';
import { Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { companyName } from '@utils/helper/functions/navigation';

export default function AuthenticationFailed() {
  return (
    <>
      <Head>
        <title>{`Authentication Failed - ${companyName}`}</title>
      </Head>

      <ErrorIcon color="error" sx={{ fontSize: '4rem' }} />
      <Typography variant="h4" sx={{ m: 2, fontWeight: 500 }}>
        Authentication Failed
      </Typography>
      <Typography>
        It looks like you may have clicked on an invalid email verification
        link.
      </Typography>
      <Typography>
        Please close this window and try authenticating again.
      </Typography>
    </>
  );
}
