import useForm from "../../hooks/useForm";
import SubmitButton from "../SubmitButton";
import Input from "../Input";
import CardForm from "../CardForm";

interface FormType {
  title: string;
  body: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PostForm({ onSubmit }: any) {
  const { errors, isLoading, handleChange, handleSubmit } = useForm<FormType>({
    initialValues: {
      title: "",
      body: "",
    },
    onSubmit,
    validate: (values): FormType => {
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
      <h1>Write</h1>
      <Input
        type="text"
        name="title"
        placeholder="제목"
        onChange={handleChange}
        required
      />
      {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}
      <div>
        <textarea
          name="body"
          placeholder="내용"
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
          Write
        </SubmitButton>
      </div>
    </CardForm>
  );
}

export default PostForm;
