import { forwardRef } from 'react';
import { Alert as MuiAlert } from "@mui/material";

export const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });