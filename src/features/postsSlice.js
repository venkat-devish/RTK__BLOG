import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "Crashing toolkit",
    content: "posts",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "2",
    title: "Slices...",
    content: "More slices",
    date: sub(new Date(), { minutes: 15 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
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
        const reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        const date = new Date().toISOString();
        return {
          payload: {
            id,
            title,
            date,
            content,
            userId,
            reactions,
          },
        };
      },
    },
    reactionAdded: (state, action) => {
      const { postId, reactionName } = action.payload;
      const exisitingPost = state.find((post) => post.id === postId);
      if (exisitingPost) {
        exisitingPost.reactions[reactionName]++;
      }
    },
  },
});

export const { postAdded, reactionAdded } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts;
export default postsSlice.reducer;
