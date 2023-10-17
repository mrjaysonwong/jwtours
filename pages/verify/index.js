import Head from 'next/head';
import { companyName } from '@utils/helper/navigation';
import EmailVerification from '@components/EmailVerification';

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
