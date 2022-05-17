import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostListForm from "@components/PostListForm";
import PostList from "@components/PostList";
import Divider from "@components/Divider";
import { RootState } from "../state";

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
      <Divider />
      <h3>게시글 총 갯수:{postCount}</h3>
      <PostListForm>
        <PostList />
      </PostListForm>
    </div>
  );
}

export default PostsPage;
