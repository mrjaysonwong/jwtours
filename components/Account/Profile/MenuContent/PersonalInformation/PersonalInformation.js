import { useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Typography, Box, Grid, Button } from '@mui/material';
import ProfilePhoto from './Cards/ProfilePhoto/ProfilePhoto';
import FormDetails from './Cards/FormDetails/FormDetails';
import { UserContext } from '@pages/account/profile';
import { useUserData } from '@utils/hooks/useUserData';

export default function PersonalInformation() {
  const { userId } = useContext(UserContext);
  const { isError, error } = useUserData(userId);
  const router = useRouter();

  return (
    <>
      <Typography variant="h5" sx={{ mb: 5 }}>
        Personal Information
      </Typography>

      {!isError && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <ProfilePhoto />
            </Grid>
            <Grid item xs={12} md={8}>
              <FormDetails />
            </Grid>
          </Grid>
        </Box>
      )}

      {isError && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            height={250}
            width={250}
            src="https://res.cloudinary.com/dc6ae5jse/image/upload/v1697865182/error_etsfqu.png"
            alt="Error Sticker"
            priority
          />
          <Typography variant="h6" sx={{ my: 1, textAlign: 'center' }}>
            {error.message}
          </Typography>

          <Button
            onClick={() => router.reload()}
            variant="contained"
            sx={{ my: 1 }}
          >
            Refresh
          </Button>

          <Typography variant="body1" sx={{ mt: 5 }}>
            If the issue persists, contact JWtours support
          </Typography>
        </Box>
      )}
    </>
  );
}
