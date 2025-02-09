import * as yup from 'yup';

const mailerValidationSchema = {
  contactForm: yup.object({
    name: yup.string().required('Your name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    message: yup.string().min(5, 'Message must be at least 5 characters long').required('Message is required')
  })
};

export default mailerValidationSchema;
