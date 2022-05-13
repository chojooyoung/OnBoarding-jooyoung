import { Fragment, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import styled from "@emotion/styled";
import { postsAction } from "../state/posts";
import { RootState } from "../state";
import Spinner from "../components/Spinner";
import Divider from "../components/Divider";
import Button from "../components/Button";
import Card from "../components/Card";

function DetailPage() {
  const { postId } = useParams<{ postId: any }>();

  const navigate = useNavigate();

  const param = {
    id: postId,
  };

  const dispatch = useDispatch();
  const post = useSelector((state: RootState) => {
    return state.postsReducer.data.find(
      (post) => post.id === parseInt(postId, 10),
    );
  });

  const loading = useSelector((state: RootState) => {
    return state.postsReducer.loading;
  });
  useEffect(() => {
    const { getDataById } = postsAction;
    dispatch(getDataById(param));
  }, [dispatch, postId]);

  const handleModifyPost = () => {
    navigate(`/modify/${postId}`);
  };
  const handleNavigatePostList = () => {
    navigate(`/posts`);
  };
  return (
    <div>
      {post && !loading ? (
        <Card>
          <h1>{post.title}</h1>
          <Divider />
          <h3>{post.body}</h3>
          <ButtonWrapper>
            <Button
              type="button"
              className="modify-button"
              onClick={handleModifyPost}
              disabled={loading}
            >
              Modify
            </Button>
            <Button
              type="button"
              className="modify-button"
              onClick={handleNavigatePostList}
              disabled={loading}
            >
              List
            </Button>
          </ButtonWrapper>
        </Card>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;
export default DetailPage;
