import { useContext, createContext, useState } from 'react';
import {
  Card,
  Grid,
  Box,
  Button,
  Typography,
  Badge,
  Tooltip,
} from '@mui/material';
import { StyledCardContent } from '../styled';
import { FormDetailsContext } from '../FormDetails';
import AddEmail from './AddEmail/AddEmail';
import EmailIcon from '@mui/icons-material/Email';
import { FaCrown } from 'react-icons/fa';
import { StyledListBox } from '../styled';
import EmailMenu from './EmailMenu/EmailMenu';

export const EmailContext = createContext(null);

// what if signedin via provider/passwordless
// consider email signin

export default function Email() {
  const { userData } = useContext(FormDetailsContext);

  const [showEdit, setShowEdit] = useState(false);

  const handleEdit = () => {
    setShowEdit(true);
  };

  const sortedEmailList = userData.email
    .slice()
    .sort((a, b) => b.isPrimary - a.isPrimary);

  const emailList = sortedEmailList.map((e) => {
    return (
      <Grid item xs={12} sm={12} key={e.email}>
        {e.isVerified && (
          <StyledListBox>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              badgeContent={
                e.isPrimary && (
                  <>
                    <Tooltip
                      title="Primary Email Address"
                      arrow
                      placement="bottom-end"
                    >
                      <Box
                        sx={{
                          bgcolor: 'rgba(163, 194, 194, 0.2)',
                          borderRadius: '50%',
                          p: 0.5,
                          rotate: '20deg',
                        }}
                      >
                        <FaCrown size="1rem" color="orange" />
                      </Box>
                    </Tooltip>
                  </>
                )
              }
            >
              <EmailIcon fontSize="large" sx={{ ml: 1 }} />
            </Badge>

            <Typography variant="body2" sx={{ ml: 1 }}>
              {e.email}
            </Typography>

            <EmailContext.Provider
              value={{ isPrimary: e.isPrimary, email: e.email }}
            >
              <EmailMenu />
            </EmailContext.Provider>
          </StyledListBox>
        )}
      </Grid>
    );
  });

  return (
    <>
      <Card sx={{ mt: 3 }}>
        <StyledCardContent sx={{ py: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6">
              {!showEdit ? 'My Email Addresses' : 'Add Email Address'}
            </Typography>

            {!showEdit && (
              <>
                <Box sx={{ ml: 'auto' }}>
                  <Button variant="contained" onClick={handleEdit}>
                    Add
                  </Button>
                </Box>
              </>
            )}
          </Box>

          {!showEdit && (
            <Typography variant="body2" color="gray" sx={{ mt: 2 }}>
              You can use the following email addresses to sign in to your
              account and also to reset your password if you ever forget it.
            </Typography>
          )}

          <Box sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              {!showEdit && <>{emailList} </>}
            </Grid>
          </Box>

          <AddEmail showEdit={showEdit} setShowEdit={setShowEdit} />
        </StyledCardContent>
      </Card>
    </>
  );
}
