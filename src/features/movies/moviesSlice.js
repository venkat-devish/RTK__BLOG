import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: {},
};
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const getAllMovies = (state) => state.movies.movies;
export const { addMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
