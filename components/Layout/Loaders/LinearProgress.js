import { Box, LinearProgress } from '@mui/material';

export default function LoadingBar() {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress aria-describedby="Loading bar" aria-busy="true" />
    </Box>
  );
}
