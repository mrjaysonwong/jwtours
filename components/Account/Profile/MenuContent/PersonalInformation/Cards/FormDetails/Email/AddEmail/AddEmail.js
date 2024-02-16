import { useContext, useState } from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { FieldErrorMessage } from '@utils/helper/custom-components/CustomMessages';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addEmailSchema } from '@utils/yup/personalInfoSchema';
import axios from 'axios';
import { FormDetailsContext } from '../../FormDetails';
import { useMessageStore } from '@stores/messageStore';
import { AlertMessage } from '@utils/helper/custom-components/CustomMessages';
import LoadingButton from '@mui/lab/LoadingButton';
import { errorHandler } from '@utils/helper/functions/errorHandler';
import InfoIcon from '@mui/icons-material/Info';
import VerifyEmail from './VerifyEmail';

export default function AddEmail(props) {
  const { showEdit, setShowEdit } = props;
  const { userId } = useContext(FormDetailsContext);

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const { alert, handleAlertMessage, handleOnClose } = useMessageStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(addEmailSchema),
  });

  const onSubmit = async (values) => {
    try {
      const action = 'addEmailAddress';
      const url = `/api/auth/email/verify?userId=${userId}&action=${action}`;

      const { data } = await axios.patch(url, values);

      setOpen(true);
      setEmail(values.email);
      setCode('');
      reset();

      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { code, message } = errorHandler(error);

      setCode(code);
      handleAlertMessage(message, 'error');
    }
  };

  const handleCancel = () => {
    setShowEdit(false);
  };

  return (
    <>
      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleOnClose}
      />

      {showEdit && (
        <>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 1,
                    mb: 3,
                  }}
                >
                  <InfoIcon color="info" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="gray">
                    A one-time password (OTP) will be sent to your email
                    address.
                  </Typography>
                </Box>
                <TextField
                  {...register('email')}
                  fullWidth
                  name="email"
                  label="Email"
                  error={
                    Boolean(errors.email) || (code >= '400' && code < '500')
                  }
                  autoComplete="on"
                />

                <FieldErrorMessage error={errors.email} />
              </Grid>

              {showEdit && (
                <>
                  <Grid item xs={6} sm={6}>
                    <LoadingButton
                      fullWidth
                      variant="contained"
                      loading={Boolean(isSubmitting)}
                      onClick={handleSubmit(onSubmit)}
                      sx={{ my: 1 }}
                    >
                      Add
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

          <VerifyEmail
            open={open}
            setOpen={setOpen}
            email={email}
            setShowEdit={setShowEdit}
          />
        </>
      )}
    </>
  );
}
