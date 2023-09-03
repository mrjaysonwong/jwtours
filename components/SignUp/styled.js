import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const ErrorBox = styled(Box)({
  border: '1px solid red',
  borderRadius: '4px',
  padding: '0.5rem',
  marginBottom: '1rem',
  background: '#EDE4E0',

  svg: {
    marginRight: '0.5rem',
  },

  p: {
    display: 'flex',
    alignItems: 'center',
  },
});
