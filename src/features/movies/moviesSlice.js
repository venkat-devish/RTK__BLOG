import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiKey } from "../../common/apis/apiKey";
import movieApi from "../../common/apis/movieApi";

const initialState = {
  movies: {},
  shows: {},
  selectedDetails: {},
};

const movieText = "Harry";
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await movieApi.get(
    `?apiKey=${apiKey}&s=${movieText}&type=movie`
  );
  return response.data;
});

const showText = "Friends";
export const fetchShows = createAsyncThunk("shows/fetchShows", async () => {
  const response = await movieApi.get(
    `?apiKey=${apiKey}&s=${showText}&type=series`
  );
  return response.data;
});

export const fetchDetails = createAsyncThunk(
  "movies/fetchDetails",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${apiKey}&i=${id}&plot=full`);
    return response.data;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        console.log("Pending...");
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        console.log("success movies");
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(fetchShows.fulfilled, (state, action) => {
        console.log("success shows");
        state.shows = action.payload;
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.selectedDetails = action.payload;
      });
  },
});

export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedDetails = (state) => state.movies.selectedDetails;
export default moviesSlice.reducer;
