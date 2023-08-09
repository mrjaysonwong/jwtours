import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

export const NavContent = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  ' .btn-signin, .btn-signout': {
    marginRight: '0.5rem',
  },
  ' .btn-signin': {
    backgroundColor: 'var(--pastel-gray)',
  },
});

export const LinksWrapper = styled(Box)({
  width: '70%',
  margin: '0 1rem',
  display: 'flex',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  ul: {
    display: 'flex',
    listStyle: 'none',
  },
});

export const ButtonWrapper = styled(Box)({
  marginLeft: 'auto',
});
