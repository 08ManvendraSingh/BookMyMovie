import { Link } from "react-router";
import backgroundImg from "../assets/backgroundImage.png";
import marvelLogo from "../assets/marvelLogo.svg";
import { useSelector } from "react-redux";
import Trailers from "./Trailers";
import MovieCard from "./MovieCard";

const Home = () => {
  const { movies } = useSelector((store) => store?.movies);

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen w-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImg}
            alt="Guardians of the Galaxy"
            fill
            className="object-cover h-full w-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-1 h-full flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-24">
          <div className="max-w-xl">
            <img
              src={marvelLogo}
              alt="Marvel Studios"
              width={180}
              height={80}
              className="mb-4"
            />

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              Guardians <br />
              of the Galaxy
            </h1>

            <div className="flex items-center text-sm text-gray-300 mb-4">
              <span>Action</span>
              <span className="mx-2">|</span>
              <span>Adventure</span>
              <span className="mx-2">|</span>
              <span>Sci-Fi</span>
              <span className="mx-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                2018
              </span>
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                2h 8m
              </span>
            </div>

            <p className="text-gray-300 mb-8">
              In a post-apocalyptic world where cities ride on wheels and
              consume each other to survive, two people meet in London and try
              to stop a conspiracy.
            </p>

            <Link
              to={"/movies"}
              className="inline-flex items-center bg-[#ff4d79] hover:bg-[#ff3366] text-white px-6 py-3 rounded-full transition"
            >
              Explore Movies
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Now Showing Section */}
      <div className="bg-gradient-to-b from-black to-[#0a0f18] py-16 px-6 md:px-16 lg:px-24">
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
          {movies.length > 0 &&
            movies.map((movie) => (
              <Link key={movie?._id} to={`/movie/${movie?._id}`}>
                <MovieCard movie={movie} />
              </Link>
            ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link to={"/movies"}>
            <button className="bg-[#ff4d79] hover:bg-[#ff3366] text-white px-6 py-2 rounded-full transition cursor-pointer">
              Show more
            </button>
          </Link>
        </div>
      </div>

      {/* Trailers Section */}
      <Trailers />
    </>
  );
};

export default Home;
