import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
import { useParams } from "react-router-dom";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  status: "idle",
  posts: [],
  error: "",
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (myPost) => {
    const response = await axios.post(POSTS_URL, myPost);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (updatedPost) => {
    const { id } = updatedPost;
    const response = await axios.put(`${POSTS_URL}/${id}`, updatedPost);
    console.log(response);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (deletedPost) => {
    const { id } = deletedPost;
    const response = await axios.delete(`${POSTS_URL}/${id}`, deletedPost);
    if (response.status === 200) return deletedPost;
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
      const exisitingPost = state.posts.find((post) => post.id === postId);
      if (exisitingPost) {
        exisitingPost.reactions[reactionName]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        let min = 1;
        const postsLoaded = action.payload.map((post) => {
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
        state.posts = state.posts.concat(postsLoaded);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
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
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload) return;

        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log("Could not delete the post");
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id != id);
        state.posts = posts;
      });
  },
});

export const { postAdded, reactionAdded } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const selectPostById = (state, postId) => {
  return state.posts.posts.find((post) => post.id === postId);
};
export default postsSlice.reducer;
