import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { postsAction } from "../state/posts";
import { RootState } from "../state";
import Spinner from "../components/Spinner";
import Header from "../components/Header";

function DetailPage() {
  const { postId } = useParams<{ postId: any }>();

  const param = {
    id: postId,
  };

  const dispatch = useDispatch();
  const post = useSelector((state: RootState) => {
    return state.postsReducer.data.find(
      (post) => post.id === parseInt(postId, 10),
    );
  });
  useEffect(() => {
    const { getDataById } = postsAction;
    dispatch(getDataById(param));
  }, [dispatch, postId]);

  return (
    <div>
      {post ? (
        <>
          <Header>{post.title}</Header>
          <span>{post.body}</span>
          {/* eslint-disable-next-line react/button-has-type */}
          <button>수정하기</button>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default DetailPage;
