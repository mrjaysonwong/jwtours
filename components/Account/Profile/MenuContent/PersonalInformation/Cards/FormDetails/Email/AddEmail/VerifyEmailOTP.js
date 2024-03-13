import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Grid,
  Typography,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { FormDetailsContext } from '../../FormDetails';
import { useMessageStore } from '@stores/messageStore';
import { AlertMessage } from '@utils/helper/custom-components/CustomMessages';
import LoadingButton from '@mui/lab/LoadingButton';
import { errorHandler } from '@utils/helper/functions/errorHandler';
import Slide from '@mui/material/Slide';
import { sleep } from '@utils/helper/functions/sleep';
import { StyledDialog } from '../../styled';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function VerifyEmailOTP(props) {
  const { userId, refetch } = useContext(FormDetailsContext);

  const { open, setOpen, email, setShowEdit } = props;

  const [otp, setOtp] = useState(undefined);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [counter, setCounter] = useState(60);

  const { alert, handleAlertMessage, handleOnClose } = useMessageStore();

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleOnChange = (event) => {
    const { value } = event.target;
    setOtp(value);
  };

  const handleVerifyOTP = async () => {
    try {
      setIsSubmitting(true);
      await sleep(600);

      const mode = 'otp';
      const type = 'email';
      const url = `/api/auth/verify?email=${email}&userId=${userId}&mode=${mode}&type=${type}`;

      const { data } = await axios.patch(url, { otp });

      setOpen(false);
      setShowEdit(false);
      setIsSubmitting(false);

      refetch();

      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);

      setIsSubmitting(false);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  const handleResendOTP = async () => {
    try {
      const mode = 'add-email-address';
      const type = 'email';
      const url = `/api/auth/verify?email=${email}&userId=${userId}&mode=${mode}&type=${type}`;

      const { data } = await axios.patch(url, { email });

      setCounter(60);
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);

      handleAlertMessage(errorMessage, 'error');
    }
  };

  useEffect(() => {
    if (open) {
      setCounter(60);

      const intervalId = setInterval(() => {
        setCounter((prevCounter) =>
          prevCounter > 0 ? prevCounter - 1 : prevCounter
        );
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [open]);

  return (
    <>
      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleOnClose}
      />

      <Box component="form">
        <StyledDialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <DialogTitle id="dialog-title">Verify Email Address</DialogTitle>

          <DialogContent>
            <DialogContentText id="dialog-description">
              OTP has been sent to {email}
            </DialogContentText>

            <Box component="form">
              <TextField
                fullWidth
                size="small"
                defaultValue={otp}
                onChange={handleOnChange}
                sx={{ letterSpacing: '4px', my: 2 }}
                inputProps={{ maxLength: 6 }}
                placeholder="●●●●●●"
              />

              <Typography
                variant="body2"
                color={counter ? 'gray' : 'info.dark'}
                sx={{ a: { cursor: 'pointer' } }}
              >
                {counter ? (
                  `Resend OTP in (${counter}s)`
                ) : (
                  <a onClick={handleResendOTP}>Resend OTP</a>
                )}
              </Typography>

              <Grid id="dialog-button" container spacing={3}>
                <Grid item xs={6} sm={6}>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={!!isSubmitting}
                    onClick={handleVerifyOTP}
                  >
                    Verify
                  </LoadingButton>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleClose}
                    autoFocus
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </StyledDialog>
      </Box>
    </>
  );
}
