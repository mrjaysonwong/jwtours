import { useContext } from 'react';
import { Card, Avatar, Typography, Button, Grid } from '@mui/material';
import { StyledCardContent, PictureWrapper, UploadOverlay } from './styled';
import { UserContext } from '@pages/account/profile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

export default function ProfilePhoto() {
  const { user, isMale, isFemale } = useContext(UserContext);

  return (
    <>
      <Card>
        <StyledCardContent>
          <PictureWrapper>
            <UploadOverlay className="upload-overlay">
              <PhotoCameraIcon />
              <Typography variant="body1">Update photo</Typography>
            </UploadOverlay>
            <Avatar
              alt="Profile Picture"
              src={`${
                !user.image || user.accountType === 'credentials'
                  ? `/assets/avatar/${
                      isMale ? 'male' : isFemale ? 'female' : 'other'
                    }.png`
                  : user.image
              }`}
              referrerPolicy="no-referrer"
              sx={{ height: 120, width: 120 }}
            />
          </PictureWrapper>

          <Typography variant="body1">
            Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
          </Typography>

          <Grid container spacing={2} textAlign="center">
            <Grid item xs={12} sm={12}>
              <Button variant="contained">Update photo</Button>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button variant="outlined">Delete photo</Button>
            </Grid>
          </Grid>
        </StyledCardContent>
      </Card>
    </>
  );
}
