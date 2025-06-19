import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const Movies = () => {
  const { movies } = useSelector((store) => store?.movies);

  return (
    <div className="bg-gradient-to-b from-black to-[#0a0f18] py-16 px-6 md:px-16 lg:px-24 mt-18">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Now Showing</h2>
        <Link
          to={"/movies"}
          className="text-sm flex items-center text-gray-400 hover:text-white transition"
        >
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.slice(0, 9).map((movie) => (
          <Link key={movie?._id} to={`/movie/${movie?._id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;
