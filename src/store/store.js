import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter";
import postsReducer from "../features/postsSlice";
import usersReducer from "../features/usersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});

export default store;
