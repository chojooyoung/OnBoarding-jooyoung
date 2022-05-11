import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import Spinner from "../Spinner";
import Button from "../Button";
import Header from "../Header";
import { Post, postsAction } from "../../state/posts";

interface Props {
  post: Post;
}
interface param {
  id: number;
}
function PostItem({ post }: Props) {
  const dispatch = useDispatch();

  const param = {
    id: post.id,
  };

  const [loading, setLoading] = useState(false);

  const handleDeletePost = useCallback(
    async (param: param) => {
      setLoading(true);
      const { deletePostById } = postsAction;
      await dispatch(deletePostById(param));
      setLoading(false);
    },
    [dispatch],
  );
  return (
    <li>
      <div>{post.title}</div>
      <Link to={`/post/${post.id}`}>Detail</Link>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          //   eslint-disable-next-line react/button-has-type
          <button className="delete" onClick={() => handleDeletePost(param)}>
            Delete
          </button>
        )}
      </div>
    </li>
  );
}

export default PostItem;
