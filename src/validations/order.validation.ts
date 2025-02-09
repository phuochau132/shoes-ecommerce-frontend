import * as yup from 'yup';

const orderSchema = yup.object().shape({
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  detailAddress: yup.string().required('Detail address is required'),
  paymentMethod: yup.string().required('Payment method is required'),
  postalCode: yup
    .string()
    .notRequired()
    .matches(/^[A-Za-z0-9-\s]+$/, 'Invalid postal code format')
});

export { orderSchema };
