import * as yup from 'yup';
const productSchema = {
  review: yup.object().shape({
    title: yup
      .string()
      .min(1, 'Title must have at least 1 character')
      .max(100, 'Title must be at most 100 characters')
      .required('Title is required'),
    content: yup
      .string()
      .min(1, 'Content must have at least 1 characters')
      .max(500, 'Content must be at most 500 characters')
      .required('Content is required'),
    rating: yup
      .number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating must be at most 5')
      .required('Rating is required')
  })
};

export { productSchema };
