import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button, Typography } from '@mui/material';
import { getUrl } from 'utils/helper/common';

export default function Provider() {
  const router = useRouter();
  const previousUrl = router.query.callbackUrl;

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: getUrl(previousUrl) });
  };
  const handleGithubSignIn = () => {
    signIn('github', { callbackUrl: getUrl(previousUrl) });
  };
  const handleFacebookSignIn = () => {
    signIn('facebook', { callbackUrl: getUrl(previousUrl) });
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleGoogleSignIn}
        sx={{
          bgcolor: 'var(--light)',
          color: '#000',
          ':hover': { bgcolor: 'var(--light)' },
        }}
      >
        <Image
          src={'/assets/providers/google.svg'}
          width={30}
          height={30}
          priority
          alt="Google logo"
        />

        <Typography variant="body2">Sign in with Google</Typography>
      </Button>
      <Button
        variant="contained"
        onClick={handleGithubSignIn}
        sx={{
          bgcolor: 'var(--pastel-dark)',
          color: '#fff',
          ':hover': { bgcolor: 'var(--pastel-dark)' },
        }}
      >
        <Image
          src={'/assets/providers/github.svg'}
          width={30}
          height={30}
          priority
          alt="GitHub logo"
        />

        <Typography variant="body2">Sign in with GitHub</Typography>
      </Button>
      <Button
        variant="contained"
        onClick={handleFacebookSignIn}
        sx={{
          bgcolor: 'var(--pastel-blue)',
          color: '#fff',
          ':hover': { bgcolor: 'var(--pastel-blue)' },
        }}
      >
        <Image
          src={'/assets/providers/facebook.svg'}
          width={30}
          height={30}
          priority
          alt="Facebook logo"
        />
        <Typography variant="body2">Sign in with Facebook</Typography>
      </Button>
    </>
  );
}
