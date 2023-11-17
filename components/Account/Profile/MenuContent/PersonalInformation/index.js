import { useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Typography, Box, Grid, Button } from '@mui/material';
import ProfilePhoto from './Cards/ProfilePhoto';
import FormDetails from './Cards/FormDetails';
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <ProfilePhoto />
            </Grid>
            <Grid item xs={12} md={8}>
              <FormDetails userId={userId} router={router} />
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
          <Typography variant="h6">{error.message}</Typography>
          <Typography>Try refreshing your browser</Typography>
          <Typography>
            If the issue persists, contact JWTours support
          </Typography>
          <Button
            onClick={() => router.reload()}
            variant="contained"
            sx={{ my: 1 }}
          >
            Refresh
          </Button>
        </Box>
      )}
    </>
  );
}
