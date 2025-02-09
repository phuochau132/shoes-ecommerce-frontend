import * as yup from 'yup';
const authSchema = yup.object().shape({
  full_name: yup
    .string()
    .min(1, 'Full name must have at least 1 character')
    .max(100, 'Full name must be at most 100 characters'),
  telephone: yup
    .string()
    .matches(/^\+84[1-9][0-9]{7,11}$/, 'Invalid telephone number. Format: +84XXXXXXXXX')
    .min(10, 'Telephone must be at least 10 digits')
    .max(15, 'Telephone must be at most 15 digits'),
  address: yup
    .string()
    .matches(/^[a-zA-Z0-9\s]+$/, 'Address must be alphanumeric')
    .required('Address is required'),
  email: yup.string().email('Invalid email address'),
  password: yup.string().min(8, 'Password must be at least 8 characters')
});

export { authSchema };
