import { useContext, useState, useRef } from 'react';
import Image from 'next/image';
import { Card, Avatar, Typography, Button, Grid } from '@mui/material';
import { StyledCardContent, PictureWrapper, UploadOverlay } from './styled';
import { UserContext } from '@pages/account/profile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Skeleton from '@components/Layout/Loaders/Skeleton';
import { useUserData } from '@utils/hooks/useUserData';
import { StyledInputUpdatePhoto } from './styled';
import { CldUploadWidget } from 'next-cloudinary';

export default function ProfilePhoto() {
  const { user, userId, isMale, isFemale } = useContext(UserContext);
  const { isLoading, data } = useUserData(userId);
  

  const handleOnClick = (open) => {
    open();
  };

  return (
    <>
      {isLoading && <Skeleton />}

      {data && (
        <Card>
          <StyledCardContent>
            <PictureWrapper>
              {/* <UploadOverlay className="upload-overlay">
                <PhotoCameraIcon />
                <Typography variant="body1" className="text">
                  Update photo
                </Typography>
              </UploadOverlay> */}
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
                sx={{ height: 160, width: 160 }}
              />
            </PictureWrapper>

            <Typography variant="body1">
              Allowed *.jpeg, *.jpg, *.png, *.gif max size of 10MB
            </Typography>

            <Grid container spacing={2} textAlign="center">
              <Grid item xs={12} sm={12}>
                {/* <Button component="label" variant="contained">
                  Update photo
                  <StyledInputUpdatePhoto type="file" />
                </Button> */}
                <CldUploadWidget
                  uploadPreset={process.env.CLOUDINARY_UPLOAD_PRESET}
                  options={{
                    sources: ['local', 'url', 'camera'],
                    multiple: false,
                    folder: 'jwtours/avatars',
                    clientAllowedFormats: ['jpg', 'png'],
                    maxFileSize: 1500000,
                    cropping: true,
                  }}
                  onSuccess={(results, { widget }) => {
                    console.log(results.info);
                    widget.close();
                  }}
                >
                  {({ open }) => {
                    return (
                      <Button
                        variant="contained"
                        onClick={() => handleOnClick(open)}
                      >
                        Change Photo
                      </Button>
                    );
                  }}
                </CldUploadWidget>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button variant="outlined">Delete photo</Button>
              </Grid>
            </Grid>
          </StyledCardContent>
        </Card>
      )}
    </>
  );
}
