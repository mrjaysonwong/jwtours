import { Typography, Box, Grid } from '@mui/material';
import ProfilePhoto from './Cards/ProfilePhoto';
import FormDetails from './Cards/FormDetails';

export default function PersonalInformation() {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 5 }}>
        Personal Information
      </Typography>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <ProfilePhoto />
          </Grid>
          <Grid item xs={12} md={8}>
            <FormDetails />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
