import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state";
import Header from "../components/Header";
import PostList from "../components/PostList";
import { postsAction } from "../state/posts";

function PostsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const { getData } = postsAction;
    dispatch(getData({ post: "post" }));
  }, []);

  return (
    <div>
      <Header>게시글목록</Header>
      <PostList />
    </div>
  );
}

export default PostsPage;
