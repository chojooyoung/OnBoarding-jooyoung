import useForm from "../../hooks/useForm";
import Button from "../Button";
import Input from "../Input";
import CardForm from "../CardForm";

function PostForm({ onSubmit }: any) {
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
        <Button type="submit" disabled={isLoading} className="submitButton">
          Write
        </Button>
      </div>
    </CardForm>
  );
}

export default PostForm;
