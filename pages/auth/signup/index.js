import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import SignUp from '@components/SignUp/SignUp';
import { companyName } from '@utils/helper/functions/navigation';

export default function SignUpPage() {
  const router = useRouter();

  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated]);

  // to avoid flashing signup form if manually type signup page url
  if (isAuthenticated || isLoading) {
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
