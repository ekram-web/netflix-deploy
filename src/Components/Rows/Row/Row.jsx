// Imports: React hooks, CSS, your custom axios instance, a package to find YouTube trailers, and a YouTube embed component.

import React, { useEffect, useState } from "react";
import "./row.css";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

// Defines the Row component with props for the row title, the API endpoint, and a flag for large posters.

const Row = ({ title, fetchUrl, isLargeRow }) => {
  // stores the list of movies fetched from the API.
  const [movies, setMovies] = useState([]);

  // stores the YouTube video ID for the trailer.
  const [trailerUrl, setTrailerUrl] = useState("");

  // base URL for movie images.
  const base_url = "https://image.tmdb.org/t/p/original";

  // Fetches movies from the API when the component mounts or when fetchUrl changes, and saves them to state.
  useEffect(() => {
    (async () => {
      try {
        console.log(fetchUrl);
        const request = await axios.get(fetchUrl);
        // console.log(request);
        setMovies(request.data.results);
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    })();
  }, [fetchUrl]);

  /*  

# When a movie poster is clicked:
    - If a trailer is already open, it closes it.
    - Otherwise, it searches for the movie trailer on YouTube and sets  the trailer video ID in state. 
*/

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          if (url) {
            // console.log("Trailer URL:", url);
            const urlParams = new URLSearchParams(new URL(url).search);
            // console.log("URL Params:", urlParams);
            const videoId = urlParams.get("v");
            // console.log("Video ID:", videoId);
            setTrailerUrl(videoId);
          } else {
            console.log("No trailer found for this movie.");
          }
        })
        .catch((error) => console.log("Error fetching trailer:", error));
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  return (
    /* 
    *Renders:
      - The row title.
      - A list of movie posters (large or small depending on isLargeRow).
     - When a poster is clicked, shows the YouTube trailer below the row  */
    <>
      <div className="row">
        <h1>{title}</h1>
        <div className="row-posters">
          {movies?.map((movie, index) => (
            <img
              onClick={() => handleClick(movie)}
              key={movie.id || index}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              className={`row-poster ${isLargeRow && "row-posterLarge"}`}
            />
          ))}
        </div>
        <div style={{ padding: "40px" }}>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
      </div>
    </>
  );
};

export default Row;
