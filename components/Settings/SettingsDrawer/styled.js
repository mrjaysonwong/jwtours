import { List, Card, IconButton } from '@mui/material';
import { styled } from '@mui/system';

export const StyledCard = styled(Card)(({ theme }) => ({
  ' :not(:last-child)': {
    marginBottom: '1rem',
  },
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '',
}));

export const StyledIconButton = styled(IconButton)({
  position: 'fixed',
  borderRadius: '50% 50% 10% 50%',
  backgroundColor: 'rgb(73, 66, 228)',
  top: '10rem',
  right: '1rem',
  ':hover': {
    backgroundColor: 'rgb(36, 29, 173)',
  },
});
