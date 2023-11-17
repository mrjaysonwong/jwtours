import * as yup from 'yup';

export const personalInfoSchema = yup.object().shape({
  firstName: yup.string().trim().required('First name is required'),
  lastName: yup.string().trim().required('Last name is required'),
  phone: yup.object().shape({
    phoneNumber: yup
      .string()
      .trim()
      .max(10, 'Maximum of 10 digits')
      .matches(/^[0-9]*$/, 'Phone number can only contain digits'),
  }),
});
