import { forwardRef } from 'react';
import { Alert as MuiAlert, Snackbar, Typography } from '@mui/material';
import { ErrorBox } from '@components/SignUp/styled';
import ErrorIcon from '@mui/icons-material/Error';

export const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert {...props} ref={ref} elevation={6} variant="filled" />;
});

export const AlertMessage = ({ open, onClose, message, severity }) => {
  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        autoHideDuration={5000}
        onClose={onClose}
      >
        <Alert onClose={onClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

// for credentials, sign up form, verification component only
export const ErrorMessage = ({ message }) => {
  return (
    <ErrorBox>
      <Typography variant="body2" color="error">
        <ErrorIcon />
        {message}
      </Typography>
    </ErrorBox>
  );
};
