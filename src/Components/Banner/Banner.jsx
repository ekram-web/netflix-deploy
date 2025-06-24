// Imports: React hooks, your custom axios instance, API endpoints, and CSS for styling.

import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./banner.css";

const Banner = () => {
  // Helper function to shorten long text and add "... " if it exceeds

  let truncate = (text, maxLength) => {
    // Ensure str is not undefined or null
    return text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // State to store the selected movie's data.

  const [movie, setMovie] = useState({});

  // Fetches Netflix Originals from the API when the component mounts.
  // Selects a random movie from the results and saves it to state.

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const randomMovie =
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ];
        // console.log(request); // Check if poster_path exists here
        setMovie(randomMovie);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",

        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner-buttons">
          <button className="banner-button play">Play</button>
          <button className="banner-button">My List</button>
        </div>
        <h1 className="banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner-fadeBottom"></div>
    </div>
  );
};

export default Banner;
