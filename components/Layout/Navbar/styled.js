import { Box, List } from '@mui/material';
import { styled } from '@mui/system';

export const NavWrapper = styled(Box)(({ theme }) => ({
  width: '90%',
  overflow: 'auto',
  margin: '0 1rem',
  ' .active': {
    color: 'var(--active-link-color-two)',
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
    color: theme.palette.mode === 'light' ? 'var(--dark)' : null,

    ':hover': {
      background: 'var(--nav-bg-color-hover)',
      color: '#fff',
      borderRadius: '40px',
    },
  },
}));

export const StyledList = styled(List)(({ theme }) => ({
  padding: '1rem 0',

  ' & .MuiListItemButton-root': {
    padding: '0.8rem 1rem',
    borderRadius: '13px',
    margin: '0 1rem',

    span: {
      fontSize: '14px',
    },
  },

  '& .active': {
    background: 'var(--active-link-color)',

    svg: {
      color: theme.palette.mode === 'light' ? 'var(--dark)' : null,
    },

    span: {
      fontWeight: 500,
    },
  },
}));
