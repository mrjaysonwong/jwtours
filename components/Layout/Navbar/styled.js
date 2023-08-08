import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const NavContent = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  ' .btn-signin, .btn-signout': {
    marginRight: '0.5rem',
  },
});

export const LinksWrapper = styled(Box)({
  minWidth: '70%',
  display: 'flex',
  '& ul': {
    display: 'flex',
  },
  '& ul > li': {
    listStyle: 'none',
    margin: '0 1rem',
  },
});

export const ButtonWrapper = styled(Box)({
  marginLeft: 'auto',
});
