import { styled } from '@mui/system';
import { CardContent, Box, Dialog } from '@mui/material';

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light' ? 'var(--light-two)' : 'var(--dark)',

  '.error': {
    marginTop: '0.5rem',
  },

  label: {
    marginBottom: '0.5rem',
  },
}));

export const StyledListBox = styled(Box)({
  padding: '8px 0',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',

  ':hover': {
    background: 'rgba(190,190,190, 0.1)',
    cursor: 'pointer',
    borderRadius: '6px',
  },
});

export const StyledDialog = styled(Dialog)({
  '#dialog-title': {
    background: 'rgba(128,128,128, 0.1)',
  },

  '#dialog-description': {
    paddingTop: '20px',
  },

  '#dialog-button': {
    marginTop: '8px',
  },
});
