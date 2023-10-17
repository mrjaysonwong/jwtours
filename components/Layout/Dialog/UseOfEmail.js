import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export default function UseOfEmail(props) {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Use of Email for Registration
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you want to keep your registered email clean for testing
            purposes, We suggest using a disposable temporary email inbox. Visit
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
            e.g - yourname.test@yopmail.com
            <br />
            avoid - test@yopmail.com
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
          <br />
          <DialogContentText id="alert-dialog-description">
            For testing purposes, the verification link will be active for 2mins
            not 24hrs. In final production we will apply the 24hrs.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
