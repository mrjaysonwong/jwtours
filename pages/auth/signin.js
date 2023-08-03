import { useEffect } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@pages/api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SignIn from '@components/Login';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.back();
    }
  }, [isAuthenticated, router]);

  return <SignIn />;
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);

  return {
    props: {
      session,
    },
  };
}
