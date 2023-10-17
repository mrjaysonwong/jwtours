import { Card, IconButton } from '@mui/material';
import { styled } from '@mui/system';

export const StyledCard = styled(Card)(({ theme }) => ({
  ' :not(:last-child)': {
    marginBottom: '1rem',
  },
  backgroundColor: theme.palette.mode === 'light' ? 'var(--light-two)' : 'var(--dark-two)',
}));

export const StyledIconButton = styled(IconButton)({
  position: 'fixed',
  borderRadius: '50% 50% 10% 50%',
  backgroundColor: 'rgb(73, 66, 228)',
  bottom: '5rem',
  right: '1rem',
  ':hover': {
    backgroundColor: 'rgb(36, 29, 173)',
  },
});
