import React, { useContext } from 'react';
import { Button, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SendLink from './SendSignInLink';
import { ShowFormContext } from '../SignIn';

export default function Email() {
  const {
    showSendLink,
    setShowOAuth,
    setShowSendLink,
    setShowCredentials,
  } = useContext(ShowFormContext);

  const handleOnClick = () => {
    setShowSendLink(true);
    setShowCredentials(false);
    setShowOAuth(false);
  };

  return (
    <>
      <Button
        variant="contained"
        disabled={showSendLink}
        onClick={handleOnClick}
        sx={{
          bgcolor: !showSendLink && 'var(--light)',
          color: 'var(--dark)',
          ':hover': { bgcolor: !showSendLink && 'var(--light)' },
        }}
      >
        <EmailIcon sx={{ height: 30, width: 30 }} />
        <Typography variant="body2">Sign in with Email</Typography>
      </Button>

      {showSendLink && <SendLink />}
    </>
  );
}
