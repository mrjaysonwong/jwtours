import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const NavWrapper = styled(Box)({
  width: '70%',
  overflow: 'auto',
  margin: '0 1rem',
  ' .active': {
    color: 'var(--active-link-color)',
    p: {
      fontWeight: 500,
    },
  },

  ul: {
    width: '100%',
    display: 'flex',
    padding: 0,
    margin: 0,
    listStyle: 'none',
    cursor: 'pointer',
  },
  li: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    flexGrow: 1,
    padding: '0.5rem 1rem',
    margin: '0.5rem 0',
    ':hover': {
      background: 'var(--bg-color3)',
      color: '#fff',
      borderRadius: '40px',
    },
  },
});

export const LogoWrapper = styled(Box)({
  a: {
    display: 'flex',
  },
});
