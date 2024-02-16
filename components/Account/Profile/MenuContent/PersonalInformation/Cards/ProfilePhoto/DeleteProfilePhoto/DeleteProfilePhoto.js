import { useContext } from 'react';
import { Dialog, DialogTitle, DialogActions, Button, Box } from '@mui/material';
import axios from 'axios';
import { useMessageStore } from '@stores/messageStore';
import { AlertMessage } from '@utils/helper/custom-components/CustomMessages';
import { UserContext } from '@pages/account/profile';

export default function DeleteProfilePhoto(props) {
  const { openConfirm, setOpenConfirm, loading, setLoading, refetch } = props;

  const { userId } = useContext(UserContext);

  const { alert, handleAlertMessage } = useMessageStore();

  const handleDeletePhoto = async () => {
    setLoading(true);

    try {
      const action = 'deleteProfilePhoto';
      const url = `/api/users?userId=${userId}&action=${action}`;

      const { data } = await axios.patch(url);

      refetch();
      setOpenConfirm(false);
      setLoading(false);
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      console.error(error);
      handleAlertMessage('An error occured, Please try again.', 'error');
    }
  };

  const handleCancel = () => {
    setOpenConfirm(false);
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
          open={openConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-content"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete photo?
          </DialogTitle>
          <DialogActions>
            <Box sx={{ my: 1 }}>
              <Button
                variant="contained"
                disabled={loading}
                onClick={handleDeletePhoto}
                sx={{ mr: 1 }}
              >
                Confirm
              </Button>
              <Button
                variant="outlined"
                disabled={loading}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
