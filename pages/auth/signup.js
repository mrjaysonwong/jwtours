import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import SignUp from '@components/SignUp';
import { companyName } from '@utils/helper/navigation';

export default function SignUpPage() {
  const router = useRouter();

  const { data: session, status } = useSession();
  const authenticated = status === 'authenticated';

  useEffect(() => {
    if (authenticated) {
      router.replace('/');
    }
  }, [authenticated, router]);

  // to avoid flashing signup form if manually type signup page url
  if (authenticated || status === 'loading') {
    return null;
  }

  return (
    <>
      <Head>
        <title>{`Sign Up - ${companyName}`}</title>
      </Head>

      <SignUp />
    </>
  );
}
