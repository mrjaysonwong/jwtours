import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SignUp from '@components/SignUp';

export default function SignUpPage() {
  const { data: session, status } = useSession();
  const authenticated = status === 'authenticated';

  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      router.push('/');
    }
  }, [authenticated, router]);

  // to avoid flashing signup form if manually type signup form url
  if (authenticated || status === 'loading') {
    return null;
  }

  return <SignUp />;
}
