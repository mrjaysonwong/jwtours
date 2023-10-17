import { useContext } from 'react';
import { Card, Grid, Box, Button, TextField } from '@mui/material';
import { StyledCardContent } from './styled';
import { UserContext } from '@pages/account/profile';

export default function FormDetails() {
  const { user } = useContext(UserContext);
  const [firstName, lastName] = user.name.split(' ');


  return (
    <>
      <Card>
        <StyledCardContent sx={{ py: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="First Name"
                defaultValue={firstName}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Last Name"
                defaultValue={lastName}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                defaultValue={user.email}
              />
            </Grid>

   

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Date of Birth"
                defaultValue={'November 29, 1992'}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Home Town"
                defaultValue={'General Santos City, PH'}
              />
            </Grid>
            <Box sx={{ mt: 4, ml: 'auto' }}>
              <Button variant="contained">Save Changes</Button>
            </Box>
          </Grid>
        </StyledCardContent>
      </Card>
    </>
  );
}
