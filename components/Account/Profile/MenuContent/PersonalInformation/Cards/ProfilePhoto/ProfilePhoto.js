import { useContext, useEffect, useState } from 'react';
import { Box, Card, Avatar, Typography, Button, Grid } from '@mui/material';
import { StyledCardContent, PictureWrapper, UploadOverlay } from './styled';
import { UserContext } from '@pages/account/profile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Skeleton from '@components/Layout/Loaders/Skeleton';
import { useUserData } from '@utils/hooks/useUserData';
import { StyledInputUpdatePhoto } from './styled';
import EditProfilePhoto from './EditProfilePhoto/EditProfilePhoto';
import DeleteProfilePhoto from './DeleteProfilePhoto/DeleteProfilePhoto';
import { useMessageStore } from '@stores/messageStore';
import { setFileToBase } from '@utils/helper/functions/image-handler/setFileToBase';

export default function ProfilePhoto() {
  const { userId } = useContext(UserContext);
  const { isLoading, data, refetch } = useUserData(userId);

  const userData = data?.result;

  const initialFname = userData?.firstName.substring(0, 1);
  const uploadedImage = userData?.image.url;
  const [selectedImage, setSelectedImage] = useState(null);

  const { handleAlertMessage } = useMessageStore();

  const [loading, setLoading] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleImage = (event) => {
    setFileToBase(event, setOpenEdit, setSelectedImage, handleAlertMessage);
  };

  return (
    <>
      {isLoading && <Skeleton />}

      {data && (
        <>
          <Card>
            <StyledCardContent>
              <PictureWrapper>
                {/* <UploadOverlay className="upload-overlay">
                  <PhotoCameraIcon />
                  <Typography variant="body1" className="text">
                    Upload photo
                  </Typography>
                </UploadOverlay> */}

                {uploadedImage ? (
                  <Avatar
                    alt="Avatar"
                    src={uploadedImage}
                    referrerPolicy="no-referrer"
                    sx={{ height: 160, width: 160 }}
                  />
                ) : (
                  <Avatar
                    alt="Avatar"
                    sx={{ height: 160, width: 160, fontSize: '4rem' }}
                  >
                    {initialFname}
                  </Avatar>
                )}
              </PictureWrapper>

              <Typography variant="body1">
                Allowed format *.JPG, *.PNG
              </Typography>

              <Grid container spacing={2} textAlign="center">
                <Grid item xs={12} sm={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      mx: 5,
                      button: { mt: 2 },
                    }}
                  >
                    <Button component="label" variant="contained">
                      Upload photo
                      <StyledInputUpdatePhoto
                        type="file"
                        id="file-input-avatar"
                        onChange={handleImage}
                      />
                    </Button>

                    {uploadedImage && (
                      <Button
                        variant="outlined"
                        onClick={() => setOpenConfirm(true)}
                      >
                        Delete photo
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>

              <EditProfilePhoto
                openEdit={openEdit}
                setOpenEdit={setOpenEdit}
                selectedImage={selectedImage}
                loading={loading}
                setLoading={setLoading}
                refetch={refetch}
              />

              <DeleteProfilePhoto
                openConfirm={openConfirm}
                setOpenConfirm={setOpenConfirm}
                loading={loading}
                setLoading={setLoading}
                refetch={refetch}
              />
            </StyledCardContent>
          </Card>
        </>
      )}
    </>
  );
}
