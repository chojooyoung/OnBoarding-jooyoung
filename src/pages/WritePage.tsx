import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostForm from "@components/PostForm";
import { postsAction } from "../state/posts";
import { RootState } from "../state";

function WritePage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const currentyPostList = useSelector((state: RootState) => {
    return state.postsReducer.data;
  });

  useEffect(() => {
    const { getData } = postsAction;
    dispatch(getData({ post: "post" }));
  }, []);

  const onSubmit = async (values: { title: string; body: string }) => {
    setLoading(true);
    const { createPost } = postsAction;
    await dispatch(createPost(values));
    const latestPostId = currentyPostList[currentyPostList.length - 1].id + 1;
    navigate(`/post/${latestPostId}`);
    setLoading(false);
  };

  return (
    <div>
      <h1>글쓰기 페이지 입니다.</h1>
      <PostForm onSubmit={onSubmit} />
    </div>
  );
}

export default WritePage;
