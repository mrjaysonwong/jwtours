import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Slider,
} from '@mui/material';
import { CropContainer, Controls } from '../styled';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '@utils/helper/getCroppedImg';
import { emptyFileInput } from '@utils/helper/emptyFileInput';
import { useMessageStore } from '@stores/messageStore';
import { AlertMessage } from '@utils/helper/alertMessage';

export default function EditProfilePhoto(props) {
  const { open, setOpen, selectedImage, setCroppedImage, loading, submitForm } =
    props;
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const { alert, handleAlertMessage } = useMessageStore();

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    try {
      const croppedImage = await getCroppedImg(
        selectedImage,
        croppedAreaPixels
      );

      setCroppedImage(croppedImage);
    } catch (error) {
      console.error('Error cropping image:', error);
      handleAlertMessage('An error occured, Please try again.', 'error');
    }
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const handleClose = () => {
    emptyFileInput();
    setOpen(false);
  };
  return (
    <>
      {alert.open && (
        <AlertMessage
          open={true}
          message={alert.message}
          severity={alert.severity}
        />
      )}

      <div>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-content"
        >
          <DialogTitle id="alert-dialog-title">Edit Photo</DialogTitle>
          <DialogContent
            dividers
            sx={{
              display: 'flex',
              justifyContent: 'center',
              height: '450px',
              position: 'relative',
            }}
          >
            <CropContainer>
              <Cropper
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={onCropChange}
                onCropComplete={onCropComplete}
                onZoomChange={onZoomChange}
              />
            </CropContainer>

            <Controls>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-label="Zoom"
                onChange={(e, zoom) => onZoomChange(zoom)}
              />
            </Controls>
          </DialogContent>
          <DialogActions>
            <Box
              component="form"
              encType="multipart/form-data"
              onSubmit={submitForm}
            >
              <Box
                sx={{
                  my: 1,
                  mx: { xs: 4, sm: 10 },
                }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  sx={{ mr: 1, width: '120px' }}
                >
                  {loading ? 'Saving...' : 'Save Photo'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
