import {
  createAsyncThunk,
  createSlice,
  current,
  nanoid,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  status: "idle",
  posts: [],
  error: null,
  postAddedStatus: "idle",
  postAddedError: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (postData) => {
    const response = await axios.post(POSTS_URL, postData);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (updatedPost) => {
    const { id } = updatedPost;
    const response = await axios.put(`${POSTS_URL}/${id}`, updatedPost);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postData) => {
    const { id } = postData;
    const response = await axios.delete(`${POSTS_URL}/${id}`, postData);
    if (response.status === 200) return postData;
    return `${response.status} ${response.statusText}`;
  }
);

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
        const date = new Date().toISOString();
        const reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        return {
          payload: {
            id,
            title,
            content,
            userId,
            date,
            reactions,
          },
        };
      },
    },
    reactionAdded: (state, action) => {
      if (!action.payload) {
        return;
      }
      const { postId, reactionName } = action.payload;
      const oldPost = state.posts.find((post) => post.id === postId);
      // state = [...state, oldPost.reactions[reactionName]++];
      if (oldPost) oldPost.reactions[reactionName]++;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";

        let min = 1;
        const fetchedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        state.posts = state.posts.concat(fetchedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.pending, (state) => {
        state.postAddedStatus = "loading";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.postAddedStatus = "success";
        action.payload.id = state.posts[state.posts.length - 1].id + 1;
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        state.posts.push(action.payload);
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.postAddedStatus = "error";
        state.postAddedError = action.error.message;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
      });
  },
});

export const { postAdded, reactionAdded } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getPostAddedStatus = (state) => state.posts.postAddedStatus;
export const getPostAddedError = (state) => state.posts.postAddedError;
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === +postId);
export default postsSlice.reducer;
