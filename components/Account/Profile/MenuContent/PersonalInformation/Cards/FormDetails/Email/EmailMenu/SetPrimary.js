import React, { useContext, useEffect } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Box,
} from '@mui/material';
import { StyledDialog } from '../../styled';
import { EmailContext } from '../Email';
import { FormDetailsContext } from '../../FormDetails';
import axios from 'axios';
import { useMessageStore } from '@stores/messageStore';
import { AlertMessage } from '@utils/helper/custom-components/CustomMessages';
import { errorHandler } from '@utils/helper/functions/errorHandler';

export default function SetPrimary(props) {
  const { userId, refetch } = useContext(FormDetailsContext);
  const { email } = useContext(EmailContext);
  const { open, setOpen } = props;

  const { alert, handleAlertMessage, handleOnClose } = useMessageStore();

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleMakePrimary = async () => {
    try {
      const mode = 'update-primaryemail';
      const url = `/api/users?userId=${userId}&mode=${mode}`;

      const { data } = await axios.patch(url, { email });

      refetch();
      setOpen(false);

      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);

      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleOnClose}
      />

      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Make Primary</DialogTitle>

        <DialogContent>
          <DialogContentText id="dialog-description">
            This will make {email} as your primary email address.
          </DialogContentText>

          <Grid id="dialog-button" container spacing={3}>
            <Grid item xs={7} sm={6}>
              <Button variant="contained" fullWidth onClick={handleMakePrimary}>
                Make Primary
              </Button>
            </Grid>
            <Grid item xs={5} sm={6}>
              <Button variant="outlined" fullWidth onClick={handleClose}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </StyledDialog>
    </>
  );
}
