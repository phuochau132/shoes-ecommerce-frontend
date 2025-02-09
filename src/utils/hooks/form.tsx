import { useState } from 'react';
import { ValidationError } from 'yup';

const useForm = <T extends Record<string, any>>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return { formData, handleChange, setFormData };
};

const useValidation = (schema: any) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const validate = async (values: Record<string, any>, isErrorSet: boolean = true) => {
    try {
      await schema.validate(values, { abortEarly: false });
      if (isErrorSet) {
        setErrors({});
      }
      return {};
    } catch (err) {
      if (err instanceof ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((validationError) => {
          if (validationError.path && validationError.path in values) {
            newErrors[validationError.path] = validationError.message;
          }
        });
        if (isErrorSet) {
          setErrors(newErrors);
        }
        return newErrors;
      }
    }
  };
  return { errors, validate };
};
export default useValidation;

export { useForm, useValidation };
