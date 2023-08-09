import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

export const MainContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  a: {
    color: 'var(--link-color)',
    cursor: 'pointer',
  },
});

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

export const StyledButton = styled(Button)({
  backgroundImage:
    'linear-gradient(to right, #7474BF 0%, #348AC7  51%, #7474BF  100%)',
  textAlign: 'center',
  textTransform: 'uppercase',
  transition: '0.5s',
  backgroundSize: '200% auto',
  color: 'white',

  '&:hover': {
    backgroundPosition: 'right center',
    color: '#fff',
    textDecoration: 'none',
  },
});
