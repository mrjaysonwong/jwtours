import { List, Card, Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';

export const StyledDrawerList = styled(List)({
  minHeight: '100vh',
  padding: '1rem',
});

export const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
});

export const StyledIconButton = styled(IconButton)({
  position: 'fixed',
  borderRadius: '50% 50% 10% 50%',
  backgroundColor: '#4942E4',
  top: '10rem',
  right: '1rem',
  ':hover': {
    backgroundColor: '#241dad',
  },
});

export const StyledCard = styled(Card)({
  ' :not(:last-child)': {
    marginBottom: '1rem',
  },
});
