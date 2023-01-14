import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../app/postsSlice";
import usersReducer from "../app/usersSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});

export default store;
