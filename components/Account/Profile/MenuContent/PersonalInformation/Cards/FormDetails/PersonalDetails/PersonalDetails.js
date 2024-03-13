import { createContext, useContext, useState } from 'react';
import { Card, Grid, Box, Button, Typography } from '@mui/material';
import { StyledCardContent } from '../styled';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalInfoSchema } from '@utils/yup/personalInfoSchema';
import axios from 'axios';
import { useMessageStore } from '@stores/messageStore';
import { AlertMessage } from '@utils/helper/custom-components/CustomMessages';
import LoadingButton from '@mui/lab/LoadingButton';
import { sleep } from '@utils/helper/functions/sleep';
import { errorHandler } from '@utils/helper/functions/errorHandler';
import { FormDetailsContext } from '../FormDetails';
import Name from './Name';
import Gender from './Gender';
import DateOfBirth from './DateOfBirth';
import Phone from './Phone';
import Address from './Address';
import Language from './Language';

export const PersonalDetailsContext = createContext(null);

export default function PersonalDetails() {
  const { userId, userData, refetch } = useContext(FormDetailsContext);

  const { alert, handleAlertMessage, handleOnClose } = useMessageStore();

  const [showEdit, setShowEdit] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(personalInfoSchema),
  });

  const handleEdit = () => {
    setShowEdit(true);
  };

  const handleCancel = () => {
    setShowEdit(false);
  };

  const value = {
    register,
    control,
    userData,
    errors,
    showEdit,
  };

  const onSubmit = async (values) => {
    await sleep(1000);

    try {
      const mode = 'update-personaldetails';
      const url = `/api/users?userId=${userId}&mode=${mode}`;

      const { data } = await axios.patch(url, values);

      refetch();
      setShowEdit(false);
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

      <Card>
        <StyledCardContent sx={{ py: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6">Personal Details</Typography>

            {!showEdit && (
              <>
                <Box sx={{ ml: 'auto' }}>
                  <Button variant="contained" onClick={handleEdit}>
                    Edit
                  </Button>
                </Box>
              </>
            )}
          </Box>

          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <PersonalDetailsContext.Provider value={value}>
                <Name />
                <Gender />
                <DateOfBirth />
                <Phone />
                <Address />
                <Language />
              </PersonalDetailsContext.Provider>

              {showEdit && (
                <>
                  <Grid item xs={6} sm={6}>
                    <LoadingButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      loading={Boolean(isSubmitting)}
                      onClick={handleSubmit(onSubmit)}
                      sx={{ my: 1 }}
                    >
                      Save
                    </LoadingButton>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <LoadingButton
                      fullWidth
                      variant="outlined"
                      disabled={isSubmitting}
                      onClick={handleCancel}
                      sx={{ my: 1 }}
                    >
                      Cancel
                    </LoadingButton>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </StyledCardContent>
      </Card>
    </>
  );
}
