import { ChangeEvent, FormEvent, useState, useEffect } from "react";

interface UseFormArgs<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validate: (values: T) => T;
}

const useForm = <T>({ initialValues, onSubmit, validate }: UseFormArgs<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<T>(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newError = validate(values);
    setErrors(newError);
  }, [values]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const newErrors = validate ? validate(values) : initialValues;
    // if (Object.keys(newErrors)[0] === "" && Object.keys(newErrors)[1] === "") {
    //   console.log("no error");
    //   await onSubmit(values);
    // }
    await onSubmit(values);
    setErrors(newErrors);
    setIsLoading(false);
  };

  return {
    values,
    setValues,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
