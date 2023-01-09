import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, selectPostById, updatePost } from "../features/postsSlice";
import { selectAllUsers, selectUserById } from "../features/usersSlice";

const EditPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const users = useSelector(selectAllUsers);
  const post = useSelector((state) => selectPostById(state, +postId));

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const handleTitle = (e) => setTitle(e.target.value);
  const handleContent = (e) => setContent(e.target.value);
  const handleAuthor = (e) => setUserId(e.target.value);

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setRequestStatus("pending");

        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${post.id}`);
      } catch (error) {
        console.error("Something went wrong!", error);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const deletePostHandler = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete the post", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          value={title}
          onChange={handleTitle}
        />
        <label htmlFor="author">Author</label>
        <select
          name="author"
          id="author"
          value={userId}
          onChange={handleAuthor}
        >
          <option value="">Select All...</option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={handleContent}
        />
        <button disabled={!canSave} type="submit">
          Save Post
        </button>
        <button
          className="deleteButton"
          disabled={!canSave}
          onClick={deletePostHandler}
        >
          Delete Post
        </button>
      </form>
    </div>
  );
};

export default EditPostForm;
