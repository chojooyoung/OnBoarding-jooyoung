import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { postsAction } from "../state/posts";
import { RootState } from "../state";
import ModyFyForm from "../components/ModifyForm";

function ModifyPage() {
  const { postId } = useParams<{ postId: any }>();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const post = useSelector((state: RootState) => {
    return state.postsReducer.data.find(
      (post) => post.id === parseInt(postId, 10),
    );
  });

  useEffect(() => {
    const { getData } = postsAction;
    dispatch(getData({ post: "post" }));
  }, []);

  const onSubmit = async (values: { title: string; body: string }) => {
    const { modifyPost } = postsAction;
    const modifyData = {
      title: values.title,
      body: values.body,
      id: postId,
    };
    await dispatch(modifyPost(modifyData));
    navigate(`/post/${postId}`);
  };

  return (
    <div>
      <h1>글수정 페이지 입니다.</h1>
      <ModyFyForm onSubmit={onSubmit} defaultValue={post} />
    </div>
  );
}

export default ModifyPage;
