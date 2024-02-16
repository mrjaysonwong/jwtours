import Head from 'next/head';
import { companyName } from '@utils/helper/functions/navigation';
import EmailVerification from '@components/EmailVerification/EmailVerification';

export default function EmailVerificationPage() {
  return (
    <>
      <Head>
        <title>{`Verify Email - ${companyName}`}</title>
      </Head>

      <EmailVerification />
    </>
  );
}
