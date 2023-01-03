import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", title: "Crashing toolkit", content: "posts" },
  { id: "2", title: "Slices...", content: "More slices" },
];
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (title, content, userId) => {
        const id = nanoid();
        return {
          payload: {
            id,
            title,
            content,
            userId,
          },
        };
      },
    },
  },
});

export const { postAdded } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts;
export default postsSlice.reducer;
