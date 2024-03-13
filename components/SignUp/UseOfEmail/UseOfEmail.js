import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { StyledDialog } from '@components/Account/Profile/MenuContent/PersonalInformation/Cards/FormDetails/styled';

export default function UseOfEmail(props) {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">
          Use of Email for Registration
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            If you want to keep your registered email clean for testing
            purposes, We suggest using a temporary email inbox. Go to
            their website{' '}
            <a
              href="https://yopmail.com/en/wm"
              target="_blank"
              style={{ color: 'green' }}
            >
              yopmail.com
            </a>{' '}
            and use a unique email.
            <br />
            <br />
            e.g - yourname.test@yopmail.com
            <br />
            avoid plain test email - test@yopmail.com
            <br />
            But if you want to use your registered email you may do so.
            <br />
            <br />
            Admin role test login credentials:
            <br />
            email: admin.jwtours@yopmail.com
            <br />
            password: Test1234
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{m: 1}}>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}
