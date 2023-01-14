import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addNewPost, postAdded } from "../../app/postsSlice";
import { selectAllUsers } from "../../app/usersSlice";

const AddNewPost = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(selectAllUsers);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setuserId] = useState("");

  const titleChangeHandler = (e) => setTitle(e.target.value);
  const contentChangeHandler = (e) => setContent(e.target.value);
  const userChangeHandler = (e) => setuserId(e.target.value);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(addNewPost({ id: nanoid(), title, content, userId }));
    setTitle("");
    setContent("");
    setuserId("");
  };

  const renderedUsers = allUsers.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const canSave = [title, content, userId].every(Boolean);
  return (
    <div>
      <h2>Add a new post</h2>
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
        <select onChange={userChangeHandler}>
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
      </form>
    </div>
  );
};

export default AddNewPost;
