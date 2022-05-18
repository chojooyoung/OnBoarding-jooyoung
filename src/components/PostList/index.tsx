import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { RootState } from "src/state";
import PostItem from "../PostItem";
import Spinner from "../Spinner";

function PostList() {
  const { data, loading } = useSelector(
    (store: RootState) => store.postsReducer,
  );

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <PostListUl>
          {data.map((post) => {
            return <PostItem key={post.id} post={post} />;
          })}
        </PostListUl>
      )}
    </div>
  );
}

const PostListUl = styled.ul`
  text-decoration: none;
`;
export default PostList;
