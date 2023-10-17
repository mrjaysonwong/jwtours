import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const ButtonWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  button: {
    margin: '0 1rem',
    padding: '0.5rem',
  },

  'button:not(:last-child)': {
    marginBottom: '1rem',
  },
});

export const UserInfoWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 1rem',

});
