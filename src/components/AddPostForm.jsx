import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewPost, postAdded } from "../features/postsSlice";
import { selectAllUsers } from "../features/usersSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const users = useSelector(selectAllUsers);

  const handleTitle = (e) => setTitle(e.target.value);
  const handleContent = (e) => setContent(e.target.value);
  const handleUser = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (error) {
        console.error("Failed to save the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const userOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  return (
    <div>
      <section>
        <h2>Add a new Post</h2>
        <form onSubmit={formSubmitHandler}>
          <label htmlFor="postTitle">Title</label>
          <input
            type="text"
            id="postTitle"
            value={title}
            placeholder="Enter title"
            onChange={handleTitle}
          />
          <label>Author</label>
          <select onChange={handleUser}>
            <option value="">Select...</option>
            {userOptions}
          </select>
          <label htmlFor="postDescription">Content:</label>
          <textarea
            name="postDescription"
            id="postDescription"
            placeholder="Enter Content"
            value={content}
            onChange={handleContent}
          />
          <button type="submit" disabled={!canSave}>
            Save Post
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddPostForm;
