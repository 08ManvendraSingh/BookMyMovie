import React from "react";
import backgroundImg from "../assets/backgroundImage.png";
import { Link } from "react-router";
import { useSelector } from "react-redux";

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
          <Link to={`/movie/${movie?._id}`}>
            <div className="bg-[#0f1724] rounded-lg overflow-hidden">
              <div className="relative h-48">
                <img
                  src={movie?.movieImg}
                  alt="A Minecraft Movie"
                  fill
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1">{movie?.movieName}</h3>
                <div className="text-xs text-gray-400 mb-2">
                  {new Date(movie?.releaseDate).getFullYear()} •{" "}
                  {movie?.genres[0]?.name} | {movie?.genres[1]?.name} •{" "}
                  {Math.floor(Number(movie?.runtime) / 60)}h{" "}
                  {Number(movie?.runtime) % 60}m
                </div>
                <div className="flex justify-between items-center">
                  <button className="bg-[#ff4d79] hover:bg-[#ff3366] text-white text-xs px-4 py-1.5 rounded-full transition">
                    Buy Tickets
                  </button>
                  <div className="flex items-center text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-yellow-500 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    6.5
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;
