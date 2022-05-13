import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state";
import PostList from "../components/PostList";
import Divider from "../components/Divider";
import Card from "../components/Card";

import { postsAction } from "../state/posts";

function PostsPage() {
  const dispatch = useDispatch();

  const postCount = useSelector((state: RootState) => {
    return state.postsReducer.data.length;
  });

  useEffect(() => {
    const { getData } = postsAction;
    dispatch(getData({ post: "post" }));
  }, [dispatch]);

  return (
    <div>
      <h1>게시글목록</h1>
      <h3>게시글 총 갯수:{postCount}</h3>
      <Card>
        <PostList />
      </Card>
    </div>
  );
}

export default PostsPage;
