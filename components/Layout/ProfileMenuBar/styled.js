import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const ButtonWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem',
  button: {
    padding: '0.5rem',
  },

  'button:not(:last-child)': {
    marginBottom: '1rem',
  },
});

export const UserInfoWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
});
