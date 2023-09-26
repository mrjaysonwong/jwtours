import { Box, CircularProgress } from '@mui/material';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size="1.5rem" color="inherit" />
    </Box>
  );
}
