import { forwardRef } from 'react';
import { Alert as MuiAlert, Snackbar, Typography } from '@mui/material';
import { ErrorBox } from '@components/SignUp/styled';
import ErrorIcon from '@mui/icons-material/Error';

export const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert {...props} ref={ref} elevation={2} variant="filled" />;
});

export const AlertMessage = ({ open, onClose, message, severity }) => {
  const ariaAttributes = {
    'aria-live': 'assertive',
    'aria-atomic': 'true',
    role: 'alert',
  };

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        autoHideDuration={5000}
        onClose={onClose}
      >
        <Alert onClose={onClose} severity={severity} {...ariaAttributes}>
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

export const FieldErrorMessage = ({ error }) =>
  error && (
    <Typography variant="body2" color="error" className="error">
      {error.message}
    </Typography>
  );
