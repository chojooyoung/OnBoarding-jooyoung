import { useState } from "react";

type FormProps = {
  initialValues: {
    userId: 0;
    title: "";
    body: "";
  };
  onSubmit: (form: { userId: number; title: string; body: string }) => void;
};

const useForm = ({ initialValues, onSubmit }: FormProps) => {
  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    onSubmit(values);
    setIsLoading(false);
  };

  return {
    values,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
