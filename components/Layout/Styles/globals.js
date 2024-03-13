import { Box, Button, List } from '@mui/material';
import { styled } from '@mui/system';
import { drawerWidth } from '@utils/helper/functions/navigation';

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

export const SubContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  a: {
    color: 'var(--link-color)',
    cursor: 'pointer',
  },
});

export const StyledForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  margin: '1rem',
  borderRadius: '0.5rem',
  maxWidth: 390,
  boxShadow:
    theme.palette.mode === 'light'
      ? 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'
      : undefined,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'var(--dark)' : 'var(--light-two)',

  '.error': {
    padding: 0,
    margin: 0,
    marginTop: '0.5rem',
  },
}));

export const StyledButton = styled(Button)({
  backgroundImage: 'var(--button-bg-color)',
  textAlign: 'center',
  textTransform: 'uppercase',
  transition: '0.5s',
  backgroundSize: '200% auto',
  color: 'white',
  padding: 0,
  margin: 0,

  '&:hover': {
    backgroundPosition: 'right center',
    color: '#fff',
    textDecoration: 'none',
  },
});

export const StyledDrawerList = styled(List)(({ theme }) => ({
  width: drawerWidth,
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? 'var(--light)' : 'var(--dark)',
}));
