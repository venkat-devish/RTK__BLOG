import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";

import "./Home.scss";
import { useDispatch } from "react-redux";
import { fetchMovies, fetchShows } from "../../features/movies/moviesSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchShows());
  }, [dispatch]);
  return (
    <>
      <div className="banner-img"></div>
      <MovieListing />
    </>
  );
};

export default Home;
