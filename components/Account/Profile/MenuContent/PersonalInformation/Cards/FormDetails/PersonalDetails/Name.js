import { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { PersonalDetailsContext } from './PersonalDetails';
import { FieldErrorMessage } from '@utils/helper/custom-components/CustomMessages';
import { CustomTextField } from '@utils/helper/custom-components/CustomTextField';
import { CustomGrid } from '@utils/helper/custom-components/CustomGrid';

export default function Name() {
  const { control, userData, errors, showEdit } = useContext(
    PersonalDetailsContext
  );

  return (
    <>
      {showEdit && (
        <>
          <CustomGrid>
            <Controller
              name="firstName"
              control={control}
              defaultValue={userData.firstName}
              render={({ field }) => (
                <CustomTextField
                  field={field}
                  id="first-name"
                  label="First Name"
                  name={field.name}
                  value={field.value}
                  error={errors.firstName}
                />
              )}
            />

            <FieldErrorMessage error={errors.firstName} />
          </CustomGrid>

          <CustomGrid>
            <Controller
              name="lastName"
              control={control}
              defaultValue={userData.lastName}
              render={({ field }) => (
                <CustomTextField
                  field={field}
                  id="last-name"
                  label="Last Name"
                  name={field.name}
                  value={field.value}
                  error={errors.lastName}
                />
              )}
            />

            <FieldErrorMessage error={errors.lastName} />
          </CustomGrid>
        </>
      )}

      {!showEdit && (
        <>
          <Grid item xs={12} sm={6}>
            <Typography>Full Name</Typography>
            <Typography variant="body2">
              {userData.firstName} {userData.lastName}
            </Typography>
          </Grid>
        </>
      )}
    </>
  );
}
