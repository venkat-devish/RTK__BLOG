import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postAdded } from "../features/postsSlice";
import { selectAllUsers } from "../features/usersSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const users = useSelector(selectAllUsers);

  const handleTitle = (e) => setTitle(e.target.value);
  const handleContent = (e) => setContent(e.target.value);
  const handleUser = (e) => setUserId(e.target.value);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(postAdded(title, content, userId));
    }
    setTitle("");
    setContent("");
  };

  const canSave = title && content && userId;

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
