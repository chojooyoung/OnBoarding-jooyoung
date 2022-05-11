import styled from "@emotion/styled";
import { ReactNode } from "react";
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
        <ul>
          {data.map((post) => {
            return <PostItem key={post.id} post={post} />;
          })}
        </ul>
      )}
    </div>
  );
}

export default PostList;
