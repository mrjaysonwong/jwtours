import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SignUp from '@components/SignUp';

export default function SignUpPage() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated || status === 'loading') {
    return null;
  }

  return <SignUp />;
}
