import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../app/usersSlice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);

  const user = users.find((user) => user.id === +userId);

  return <span>by {user ? user.name : "Unknown Author"}</span>;
};

export default PostAuthor;
