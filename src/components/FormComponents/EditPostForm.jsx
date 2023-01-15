import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, selectPostById, updatePost } from "../../app/postsSlice";
import { selectAllUsers } from "../../app/usersSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUsers = useSelector(selectAllUsers);
  const post = useSelector((state) => selectPostById(state, postId));

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.body);
  const [userId, setUserId] = useState(post.userId);
  const [editRequestStatus, setEditRequestStatus] = useState("idle");

  const titleChangeHandler = (e) => setTitle(e.target.value);
  const contentChangeHandler = (e) => setContent(e.target.value);
  const userChangeHandler = (e) => setUserId(e.target.value);

  const deleteHandler = () => {
    try {
      setEditRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setEditRequestStatus("idle");
    }
  };

  const canSave =
    [title, content, userId].every(Boolean) && editRequestStatus === "idle";
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (canSave) {
      try {
        setEditRequestStatus("pending");
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
        navigate(`/post/${postId}`);
      } catch (error) {
        console.error("Failed to save the post", error);
      } finally {
        setEditRequestStatus("idle");
      }
    }
  };

  const renderedUsers = allUsers.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Edit post</h2>
      <form onSubmit={formSubmitHandler}>
        <label htmlFor="postTitle">Title</label>
        <input
          placeholder="Enter Title...."
          type="text"
          name="postTitle"
          id="postTitle"
          value={title}
          onChange={titleChangeHandler}
        />
        <label htmlFor="postAuthor">Author</label>
        <select onChange={userChangeHandler} value={userId}>
          <option value="">Select...</option>
          {renderedUsers}
        </select>
        <label htmlFor="postContent">Content</label>
        <textarea
          placeholder="Enter Content...."
          name="postContent"
          id="postContent"
          value={content}
          onChange={contentChangeHandler}
        />
        <button disabled={!canSave} type="submit">
          Save Post
        </button>
        <button onClick={deleteHandler} className="deleteButton">
          Delete
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
