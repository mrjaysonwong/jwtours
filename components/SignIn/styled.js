import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const ProviderContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  'button:not(:last-child)': {
    marginBottom: '1rem',
  },
  p: {
    marginLeft: '0.5rem',
    textTransform: 'none',
  },
});

export const CredentialsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});
