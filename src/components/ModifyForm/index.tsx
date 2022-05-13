import useForm from "../../hooks/useForm";
import SubmitButton from "../SubmitButton";
import Input from "../Input";
import CardForm from "../CardForm";

function ModifyForm({ onSubmit, defaultValue }: any) {
  const { errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      title: "",
      body: "",
    },
    onSubmit,
    validate: (values) => {
      const { title, body } = values;
      const newErrors = {
        title: "",
        body: "",
      };
      if (!title) newErrors.title = "제목을 입력해주세요.";
      if (!body) newErrors.body = "내용을 입력해주세요.";
      return newErrors;
    },
  });

  return (
    <CardForm onSubmit={handleSubmit}>
      <h1>Modify</h1>
      <Input
        type="text"
        name="title"
        placeholder="제목"
        defaultValue={defaultValue.title}
        onChange={handleChange}
        required
      />
      {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}
      <div>
        <textarea
          name="body"
          placeholder="내용"
          defaultValue={defaultValue.body}
          onChange={handleChange}
          style={{ width: "100%", height: "300px", marginTop: 8 }}
          required
        />
      </div>
      {errors.body && <span style={{ color: "red" }}>{errors.body}</span>}
      <div>
        <SubmitButton
          type="submit"
          disabled={isLoading}
          className="submitButton"
        >
          Modify
        </SubmitButton>
      </div>
    </CardForm>
  );
}

export default ModifyForm;
