import { styled } from '@mui/system';
import { Box, CardContent, TextField } from '@mui/material';

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? 'var(--light-two)' : 'var(--dark)',
}));

