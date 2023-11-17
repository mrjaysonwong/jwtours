import { createContext } from 'react';
import { Card, Grid, Box } from '@mui/material';
import { StyledCardContent } from './styled';
import Skeleton from '@components/Layout/Loaders/Skeleton';
import { useUserData } from '@utils/hooks/useUserData';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalInfoSchema } from '@utils/yup/personalInfoSchema';
import { updateUser } from '@utils/api/client/user/authorize/user/updateUser';
import { useMessageStore } from '@stores/messageStore';
import LoadingButton from '@mui/lab/LoadingButton';
import { sleep } from '@utils/helper/sleep';
import { AlertMessage } from '@utils/helper/alertMessage';
import Name from './Name';
import Email from './Email';
import Gender from './Gender';
import Phone from './Phone';
import DateOfBirth from './DateOfBirth';
import Address from './Address';
import City from './City';

export const FormDetailsContext = createContext(null);

export default function FormDetails({ userId }) {
  const { isLoading, data, refetch } = useUserData(userId);
  const { handleApiMessage, alert, handleAlertMessage, handleOnClose } =
    useMessageStore();

  const userData = data?.result;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(personalInfoSchema),
    shouldUnregister: false,
    defaultValues: {
      city: userData?.city,
    },
  });

  const onSubmit = async (values) => {
    const userId = userData._id;

    await sleep(1000);

    try {
      const data = await updateUser(userId, values);

      if (data.error) {
        handleApiMessage(data.error.message, 'error');
        return;
      }

      refetch();
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      console.error(error.message);
      handleAlertMessage(error.message, 'error');
    }
  };

  return (
    <>
      {isLoading && (
        <>
          <Skeleton />
          <Skeleton />
        </>
      )}

      {data && (
        <Box component="form">
          <Card>
            <StyledCardContent sx={{ py: 3 }}>
              <Grid container spacing={3}>
                <FormDetailsContext.Provider
                  value={{ register, control, userData, errors }}
                >
                  <Name />
                  <Email />
                  <Gender />
                  <DateOfBirth />
                  <Phone />
                  <Address />
                  <City />
                </FormDetailsContext.Provider>

                <Box sx={{ mt: 4, ml: 'auto' }}>
                  <LoadingButton
                    variant="contained"
                    loading={Boolean(isSubmitting)}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Save Changes
                  </LoadingButton>
                </Box>
              </Grid>
            </StyledCardContent>
          </Card>
        </Box>
      )}

      {alert.open && (
        <AlertMessage
          open={true}
          onClose={handleOnClose}
          message={alert.message}
          severity={alert.severity}
        />
      )}
    </>
  );
}
