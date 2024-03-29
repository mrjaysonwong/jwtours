import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import SignIn from '@components/SignIn/SignIn';
import { companyName } from '@utils/helper/functions/navigation';

export default function SignInPage() {
  const router = useRouter();
  const { callbackUrl } = router.query;
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  useEffect(() => {
    if (isAuthenticated) {
      router.push(callbackUrl ?? '/');
    }
  }, [isAuthenticated]);

  if (isAuthenticated || isLoading) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{`Sign In - ${companyName}`}</title>
      </Head>

      <SignIn />
    </>
  );
}
