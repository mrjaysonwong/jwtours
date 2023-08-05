import { useEffect } from 'react';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@pages/api/auth/[...nextauth]';
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

// export async function getServerSideProps({ req, res }) {
//   const session = await getServerSession(req, res, authOptions);

//   return {
//     props: {
//       session,
//     },
//   };
// }
