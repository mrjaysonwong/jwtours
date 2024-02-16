import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import OtpInput from 'react-otp-input';
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

export default function VerifyEmail(props) {
  const { userId, refetch } = useContext(FormDetailsContext);

  const { open, setOpen, email, setShowEdit } = props;
  const theme = useTheme();

  const [otp, setOtp] = useState('');
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [counter, setCounter] = useState(60);

  const { alert, handleAlertMessage, handleOnClose } = useMessageStore();

  const handleVerifyOTP = async (email, userId, otp) => {
    try {
      setIsSubmitting(true);
      await sleep(600);

      const action = 'verifyEmailOTP';
      const url = `/api/auth/email/verify?email=${email}&userId=${userId}&action=${action}`;

      const { data } = await axios.patch(url, { otp });

      setOpen(false);
      setShowEdit(false);
      setIsSubmitting(false);
      setCode('');
      refetch();

      handleAlertMessage(data.message, 'success');
    } catch (error) {
      console.error('Error:', error.message);

      const { code, message } = errorHandler(error);

      setIsSubmitting(false);
      setCode(code);

      handleAlertMessage(message, 'error');
    }
  };

  const handleResendOTP = async (userId, email) => {
    try {
      const action = 'addEmailAddress';
      const url = `/api/auth/email/verify?userId=${userId}&action=${action}`;

      const { data } = await axios.patch(url, { userId, email });

      setCode('');
      setCounter(60);
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      console.error('Error:', error.message);

      const { code, message } = errorHandler(error);

      setCode(code);
      handleAlertMessage(message, 'error');
    }
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      setCounter(60);
      setCode('');

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

          <Box
            sx={{
              mt: 2,
              px: 1,
              border: `1px solid  ${
                code >= '400' && code < '500' ? 'var(--palette-red)' : 'gray'
              }`,
              borderRadius: '4px',
              '&:hover': {
                border: '1px solid var(--palette-green)',
              },
            }}
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputStyle={{
                width: '1.8rem',
                height: '2.5rem',
                backgroundColor: 'transparent',
                fontSize: '1rem',
                border: 'none',
                outline: 'none',
                color:
                  theme.palette.mode === 'dark'
                    ? 'var(--light)'
                    : 'var(--dark)',
              }}
              placeholder="●●●●●●"
              renderInput={(props) => <input {...props} />}
            />
          </Box>

          <Typography
            variant="body2"
            color={counter ? 'gray' : 'info.main'}
            sx={{ mt: 2, a: { cursor: 'pointer' } }}
          >
            {counter ? (
              `Resend OTP in (${counter}s)`
            ) : (
              <a onClick={() => handleResendOTP(userId, email)}>Resend OTP</a>
            )}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ m: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6}>
              <LoadingButton
                fullWidth
                variant="contained"
                loading={Boolean(isSubmitting)}
                onClick={() => handleVerifyOTP(email, userId, otp)}
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
        </DialogActions>
      </StyledDialog>
    </>
  );
}
