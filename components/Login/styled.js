import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const FormContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  margin: '1rem',
  borderRadius: '0.5rem',
  boxShadow:
    theme.palette.mode === 'light'
      ? 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'
      : undefined,
  backgroundColor: theme.palette.mode === 'dark' ? 'var(--dark)' : '#fff',
}));

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
