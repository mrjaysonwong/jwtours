import Head from 'next/head';
import { Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { companyName } from '@utils/helper/functions/navigation';

export default function PaymentFailed() {
  return (
    <>
      <Head>
        <title>{`Payment Failed - ${companyName}`}</title>
      </Head>
      Payment Failed
    </>
  );
}
