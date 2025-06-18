import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { FaChevronLeft, FaChevronRight, FaCirclePlay } from "react-icons/fa6";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../utils/constants";
import toast from "react-hot-toast";

const MovieDetail = () => {
  const { mId } = useParams();
  const { movies } = useSelector((store) => store?.movies);
  const filterMovie = movies.find((movie) => movie._id == mId);
  const [showData, setShowData] = useState([]);
  const [selectDate, setSelectDate] = useState(null);

  const navigate = useNavigate();

  const handleBookNow = () => {
    if (!selectDate) {
      return toast("Please select Date");
    }
    navigate(`/seat/${mId}/${selectDate}`);
  };

  const fetchShowData = async () => {
    try {
      const response = await axios(`${API_URL}/show/${mId}`, {
        withCredentials: true,
      });
      setShowData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchShowData();
  }, [mId]);

  return (
    <div className="bg-gradient-to-b from-black to-[#0a0f18] py-16 px-6 md:px-16 lg:px-24 mt-18">
      {/* Movie Details */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 h-[407px]">
            <img
              src={filterMovie?.movieImg}
              alt="A Minecraft Movie"
              width={350}
              className="rounded-lg h-full object-cover"
            />
          </div>

          {/* Movie Info */}
          <div className="flex flex-col">
            <span className="text-[#ff4d79] text-sm font-medium">
              {filterMovie?.originalLanguage == "en" && "English"}
            </span>
            <h1 className="text-4xl font-bold mt-2">
              {filterMovie?.movieName}
            </h1>

            <div className="flex items-center mt-2">
              <svg
                className="w-5 h-5 text-[#ff4d79] fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="ml-1">6.5 User Rating</span>
            </div>

            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              {filterMovie?.movieDescription}
            </p>

            <div className="mt-4 text-sm text-gray-400">
              {Math.floor(Number(filterMovie?.runtime) / 60)}h{" "}
              {Number(filterMovie?.runtime) % 60}m •{" "}
              {filterMovie?.genres?.map((gen) => gen.name + ", ")} •{" "}
              {new Date(filterMovie?.releaseDate).getFullYear()}
            </div>

            <div className="flex mt-6 space-x-4">
              <button className="flex items-center bg-[#222222] text-white px-6 py-3 rounded-md">
                <FaCirclePlay className="mr-1" />
                Watch Trailer
              </button>
              <a href="#dateSelect">
                <button className="bg-[#ff4d79] hover:bg-[#ff3366] text-white px-8 py-3 rounded-md cursor-pointer">
                  Buy Tickets
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="py-8 my-8">
        <div className="container mx-auto px-6">
          <h2 className="text-xl font-medium mb-6">Your Favorite Cast</h2>
          <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
            {filterMovie?.casts?.map((actor, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-shrink-0"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                  <img
                    src={actor?.profile_path}
                    alt={actor?.name}
                    width={64}
                    className="object-cover h-full"
                  />
                </div>
                <span className="text-xs text-center whitespace-nowrap">
                  {actor?.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div id="dateSelect" className="container mx-auto px-6 py-8">
        <div className="bg-black bg-gradient-to-br from-black to-[#37011e] rounded-lg p-8 opacity-95">
          <h2 className="text-xl font-medium">Choose Date</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center mt-4">
              <button className="p-2">
                <FaChevronLeft size={20} />
              </button>
              {showData.length > 0 &&
                showData.map((show) => (
                  <div
                    onClick={() => setSelectDate(show?.showDate)}
                    className={` px-4 py-2 rounded-md mx-2 text-white cursor-pointer ${
                      selectDate == show?.showDate
                        ? "bg-[#ff4d79] border-pink-500"
                        : "bg-[#2a2a2a] border-pink-500 hover:bg-[#ff4d79]"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-sm">
                        {new Date(show?.showDate).getDate()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(show?.showDate).toLocaleString("en-US", {
                          month: "short",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              <button className="p-2">
                <FaChevronRight size={20} />
              </button>
            </div>
            <button
              onClick={handleBookNow}
              className="bg-[#ff4d79] hover:bg-[#ff3366] text-white px-6 py-2 rounded-md text-sm cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Now Showing Section */}
      <div className="py-16 px-6 md:px-16 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">You May Also Like</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Movie Card 1 */}
          {movies.slice(0, 3).map((movie) => (
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
                    {movie?.releaseDate} • {movie?.genres[0]?.name} |{" "}
                    {movie?.genres[1]?.name} • {movie?.runtime}
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
    </div>
  );
};

export default MovieDetail;
