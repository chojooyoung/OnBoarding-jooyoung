import { Fragment, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { postsAction } from "../state/posts";
import { RootState } from "../state";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
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
  return (
    <div>
      {post && !loading ? (
        <Card>
          <h1>{post.title}</h1>
          <h2>{post.body}</h2>
          {/* eslint-disable-next-line react/button-has-type */}
          <button onClick={handleModifyPost}>수정하기</button>
        </Card>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default DetailPage;
