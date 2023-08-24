import { Box, Toolbar } from '@mui/material';
import { styled } from '@mui/system';

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  background:
    theme.palette.mode === 'light' ? 'var(--bg-color4)' : 'var(--dark)',
  position: 'fixed',
  width: 250,
}));

export const SideMenuWrapper = styled(Box)(({ theme }) => ({
  marginTop: '4rem',
  display: 'flex',
  flexDirection: 'column',
  '.active': {
    color:
      theme.palette.mode === 'dark'
        ? 'var(--active-link-color2)'
        : 'var(--active-link-color)',
    background:
      theme.palette.mode === 'dark' ? 'var(--bg-dark)' : 'var(--bg-light)',
    borderRadius: '40px 999em 999em 40px',
    boxShadow: '1px 2px 5px 1px rgba(0,0,0,0.1)',
  },

  ul: {
    listStyle: 'none',
    padding: 0,
    margin: '1rem 1rem 1rem 0',
  },
  li: {
    padding: '1rem',
  },

  p: {
    fontSize: '1.2rem',
  },
}));
