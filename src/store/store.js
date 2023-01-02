import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
