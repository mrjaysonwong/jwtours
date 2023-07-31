import { getToken } from 'next-auth/jwt';
import SignIn from '@components/Signin';

export default function SignInPage({ user }) {
  return (
    <>
      <SignIn />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const token = await getToken(ctx);

  return {
    props: {
      user: token,
    },
  };
}
