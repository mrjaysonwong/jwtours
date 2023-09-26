import * as yup from 'yup';

let EMAIL_REGX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let PASSWORD_REGX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;

export const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .required('First name is required'),
  lastName: yup
    .string()
    .trim()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .required('Last name is required'),
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .matches(EMAIL_REGX, 'Invalid email address'),

  password: yup
    .string()
    .trim()
    .required('Password is required')
    .matches(
      PASSWORD_REGX,
      'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
    )
    .min(8, 'Password must be at least 8 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirmPassword: yup
    .string()
    .trim()
    .required('Confirm your password')
    .oneOf([yup.ref('password')], 'Password must match'),
});

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .matches(EMAIL_REGX, 'Invalid email address'),
  password: yup
    .string()
    .trim()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(40, 'Password must not exceed 40 characters'),
});
