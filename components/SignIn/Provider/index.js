import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Button, Typography } from '@mui/material';

export default function Provider() {


  const handleGoogleSignIn = () => {
    signIn('google');
  };
  const handleGithubSignIn = () => {
    signIn('github');
  };
  const handleFacebookSignIn = () => {
    signIn('facebook');
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleGoogleSignIn}
        sx={{
          bgcolor: 'var(--light)',
          color: 'var(--dark)',
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

        <Typography variant="body2">Sign-In with Google</Typography>
      </Button>
      <Button
        variant="contained"
        onClick={handleGithubSignIn}
        sx={{
          bgcolor: 'var(--dark-two)',
          color: 'var(--light-two)',
          ':hover': { bgcolor: 'var(--dark-two)' },
        }}
      >
        <Image
          src={'/assets/providers/github.svg'}
          width={30}
          height={30}
          priority
          alt="GitHub logo"
        />

        <Typography variant="body2">Sign-In with GitHub</Typography>
      </Button>
      <Button
        variant="contained"
        onClick={handleFacebookSignIn}
        sx={{
          bgcolor: 'var(--pastel-blue)',
          color: 'var(--light-two)',
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
        <Typography variant="body2">Sign-In with Facebook</Typography>
      </Button>
    </>
  );
}
