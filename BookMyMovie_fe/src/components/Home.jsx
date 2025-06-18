import { Link } from "react-router";
import backgroundImg from "../assets/backgroundImage.png";
import marvelLogo from "../assets/marvelLogo.svg";
import { useSelector } from "react-redux";

const Home = () => {
  const { movies } = useSelector((store) => store?.movies);
  console.log(movies);

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
          {/* Movie Card 1 */}
          {movies.length > 0 &&
            movies.map((movie) => (
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

        <div className="flex justify-center mt-8">
          <Link to={"/movies"}>
            <button className="bg-[#ff4d79] hover:bg-[#ff3366] text-white px-6 py-2 rounded-full transition cursor-pointer">
              Show more
            </button>
          </Link>
        </div>
      </div>
      {/* Trailers Section */}
      <div className="bg-[#0a0f18] py-16 px-6 md:px-16 lg:px-24">
        <h2 className="text-2xl font-bold mb-8">Trailers</h2>

        {/* Main Trailer */}
        <div className="relative pb-[56.25%] h-0 mb-6">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Marvel Television's Ironheart | Official Trailer | Disney+"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Trailer Thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="relative rounded-lg overflow-hidden cursor-pointer group">
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <img
              src={backgroundImg}
              alt="Trailer 1"
              width={300}
              height={169}
              className="object-cover"
            />
          </div>

          <div className="relative rounded-lg overflow-hidden cursor-pointer group">
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <img
              src={backgroundImg}
              alt="Trailer 2"
              width={300}
              height={169}
              className="object-cover"
            />
          </div>

          <div className="relative rounded-lg overflow-hidden cursor-pointer group">
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <img
              src={backgroundImg}
              alt="Trailer 3"
              width={300}
              height={169}
              className="object-cover"
            />
          </div>

          <div className="relative rounded-lg overflow-hidden cursor-pointer group">
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <img
              src={backgroundImg}
              alt="Trailer 4"
              width={300}
              height={169}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
