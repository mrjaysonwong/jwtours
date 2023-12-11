import { useContext, useState, useEffect } from 'react';
import { Box, Card, Avatar, Typography, Button, Grid } from '@mui/material';
import { StyledCardContent, PictureWrapper, UploadOverlay } from './styled';
import { UserContext } from '@pages/account/profile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Skeleton from '@components/Layout/Loaders/Skeleton';
import { useUserData } from '@utils/hooks/useUserData';
import { StyledInputUpdatePhoto } from './styled';
import axios from 'axios';
import { useMessageStore } from '@stores/messageStore';
import { AlertMessage } from '@utils/helper/alertMessage';
import EditProfilePhoto from './EditProfilePhoto';
import { emptyFileInput } from '@utils/helper/emptyFileInput';

export default function ProfilePhoto() {
  const { userId } = useContext(UserContext);
  const { isLoading, data, refetch } = useUserData(userId);
  const userData = data?.result;
  const initialFname = userData?.firstName.substring(0, 1);
  const uploadedImage = userData?.image.url;
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { alert, handleAlertMessage } = useMessageStore();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const allowedFileTypes = ['image/jpeg', 'image/png'];
    const maxWidth = 1200;
    const maxHeight = 630;

    if (!allowedFileTypes.includes(file.type)) {
      // Check for allowedFileType
      emptyFileInput();
      handleAlertMessage('File format must be *.JPG or *.PNG', 'error');
      return;
    }

    // builtin js api to read file and display contents
    const reader = new FileReader();

    reader.onloadend = async () => {
      const result = reader.result;

      const image = new Image();
      image.src = result;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const newWidth = image.width;
        const newHeight = image.height;

        if (newWidth > maxWidth) {
          newWidth = maxWidth;
          newHeight = (maxWidth / image.width) * image.height;
        }

        if (newHeight > maxHeight) {
          newHeight = maxHeight;
          newWidth = (maxHeight / image.height) * image.width;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        // 5 argument syntax to resize dimension
        // start x,y axis
        // destinationWidth, destinationHeight
        ctx.drawImage(image, 0, 0, newWidth, newHeight);

        const resizedImage = canvas.toDataURL(file.type);

        setOpen(true);
        setSelectedImage(resizedImage);
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  useEffect(() => {
    // update once cropped change
  }, [croppedImage]);

  const submitForm = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const action = 'updateProfilePhoto';
      const { data } = await axios.patch(
        `/api/users?userId=${userId}&action=${action}`,
        {
          croppedImage,
        }
      );

      emptyFileInput();
      refetch();
      setLoading(false);
      setOpen(false);
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      console.error(error);
      handleAlertMessage('An error occured, Please try again.', 'error');
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Skeleton />}

      {alert.open && (
        <AlertMessage
          open={true}
          message={alert.message}
          severity={alert.severity}
        />
      )}

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
                      <Button variant="outlined">Delete photo</Button>
                    )}
                  </Box>
                </Grid>
              </Grid>

              <EditProfilePhoto
                open={open}
                setOpen={setOpen}
                selectedImage={selectedImage}
                setCroppedImage={setCroppedImage}
                loading={loading}
                submitForm={submitForm}
              />
            </StyledCardContent>
          </Card>
        </>
      )}
    </>
  );
}
